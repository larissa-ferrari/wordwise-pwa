"""
Open Library import job.

Fetches books from the Open Library Search API by subject/genre,
processes the raw data, and upserts into the local database.

Designed to be idempotent: runs that find all books already present
will simply skip them without side effects.
"""
import logging
import time
import uuid
from typing import Optional

import httpx
from sqlalchemy.orm import Session

from app.models.book import Book, BookGenre
from app.models.enums import GenreEnum

logger = logging.getLogger(__name__)

_OL_BASE = "https://openlibrary.org"
_COVER_URL = "https://covers.openlibrary.org/b/id/{cover_id}-M.jpg"

# Open Library subject → our GenreEnum value
_SUBJECT_MAP: dict[str, str] = {
    "fantasy": "fantasy",
    "fantasy fiction": "fantasy",
    "epic fantasy": "fantasy",
    "high fantasy": "fantasy",
    "dark fantasy": "fantasy",
    "romance": "romance",
    "love stories": "romance",
    "romantic fiction": "romance",
    "new adult fiction": "romance",
    "thriller": "thriller",
    "suspense": "thriller",
    "psychological thriller": "thriller",
    "mystery": "thriller",
    "detective and mystery stories": "thriller",
    "crime fiction": "thriller",
    "literary fiction": "literary",
    "classics": "literary",
    "general fiction": "literary",
    "contemporary fiction": "literary",
    "historical fiction": "literary",
    "science fiction": "scifi",
    "space opera": "scifi",
    "dystopian fiction": "scifi",
    "cyberpunk": "scifi",
    "hard science fiction": "scifi",
    "horror": "horror",
    "ghost stories": "horror",
    "occult fiction": "horror",
    "nonfiction": "nonfiction",
    "biography": "nonfiction",
    "autobiography": "nonfiction",
    "self-help": "nonfiction",
    "personal development": "nonfiction",
    "manga": "manga",
    "graphic novels": "manga",
    "comics": "manga",
}

# Subjects sent to the Open Library API, mapped to our genre value.
# Keys are used as CLI choices.
IMPORT_SUBJECTS: dict[str, str] = {
    "fantasy": "fantasy",
    "romance": "romance",
    "thriller": "thriller",
    "literary_fiction": "literary",
    "science_fiction": "scifi",
    "horror": "horror",
    "nonfiction": "nonfiction",
    "manga": "manga",
}

# Fields we request from the search endpoint (minimises response payload)
_SEARCH_FIELDS = (
    "key,title,author_name,first_publish_year,"
    "number_of_pages_median,isbn,cover_i,subject,first_sentence"
)

_VALID_GENRES = {e.value for e in GenreEnum}


class OpenLibraryImporter:
    """Stateful importer — create one per job run, then call .run()."""

    def __init__(self, db: Session, request_delay: float = 1.0):
        self.db = db
        self.request_delay = request_delay
        self.stats = {"imported": 0, "skipped": 0, "errors": 0}
        self._client = httpx.Client(timeout=30.0, headers={"User-Agent": "WordWise/1.0"})

    def close(self) -> None:
        self._client.close()

    # ------------------------------------------------------------------ #
    # Public interface                                                      #
    # ------------------------------------------------------------------ #

    def run(
        self,
        genres: Optional[list[str]] = None,
        books_per_genre: int = 50,
    ) -> dict:
        """
        Import books from Open Library.

        Args:
            genres: list of keys from IMPORT_SUBJECTS (default: all).
            books_per_genre: maximum new books to import per genre.

        Returns:
            dict with keys imported / skipped / errors.
        """
        targets = genres or list(IMPORT_SUBJECTS.keys())
        logger.info(
            "Starting Open Library import: %d genre(s), up to %d books each",
            len(targets),
            books_per_genre,
        )

        for subject_key in targets:
            genre_value = IMPORT_SUBJECTS.get(subject_key, subject_key)
            try:
                self._import_subject(subject_key, genre_value, books_per_genre)
            except Exception as exc:  # noqa: BLE001
                logger.error("Fatal error importing subject '%s': %s", subject_key, exc)
                self.stats["errors"] += 1

        logger.info(
            "Import finished — imported=%d skipped=%d errors=%d",
            self.stats["imported"],
            self.stats["skipped"],
            self.stats["errors"],
        )
        return self.stats

    # ------------------------------------------------------------------ #
    # Internal helpers                                                     #
    # ------------------------------------------------------------------ #

    def _import_subject(self, subject: str, genre: str, limit: int) -> None:
        logger.info("Subject '%s' (genre=%s) — target: %d books", subject, genre, limit)
        page_size = min(limit, 100)
        offset = 0
        new_books = 0

        while new_books < limit:
            docs = self._search_page(subject, page_size, offset)
            if not docs:
                break

            for doc in docs:
                if new_books >= limit:
                    break
                try:
                    created = self._upsert_book(doc, genre)
                    if created:
                        new_books += 1
                        self.stats["imported"] += 1
                    else:
                        self.stats["skipped"] += 1
                except Exception as exc:  # noqa: BLE001
                    logger.warning(
                        "Error processing '%s': %s", doc.get("title", "?"), exc
                    )
                    self.stats["errors"] += 1

            offset += page_size
            if len(docs) < page_size:
                # No more pages available
                break
            time.sleep(self.request_delay)

        logger.info("  → %d new books from subject '%s'", new_books, subject)

    def _search_page(self, subject: str, limit: int, offset: int) -> list[dict]:
        params = {
            "subject": subject,
            "fields": _SEARCH_FIELDS,
            "limit": limit,
            "offset": offset,
        }
        try:
            resp = self._client.get(f"{_OL_BASE}/search.json", params=params)
            resp.raise_for_status()
            return resp.json().get("docs", [])
        except httpx.HTTPError as exc:
            logger.error(
                "HTTP error — subject='%s' offset=%d: %s", subject, offset, exc
            )
            return []

    def _fetch_work_description(self, work_key: str) -> Optional[str]:
        """Hit the Works detail endpoint to get the full description."""
        try:
            time.sleep(self.request_delay)
            resp = self._client.get(f"{_OL_BASE}{work_key}.json")
            resp.raise_for_status()
            raw = resp.json().get("description")
            if isinstance(raw, dict):
                return raw.get("value")
            return raw or None
        except Exception:  # noqa: BLE001
            return None

    def _upsert_book(self, doc: dict, primary_genre: str) -> bool:
        """
        Insert a book if it doesn't already exist.

        Returns True if a new row was created, False if skipped.
        """
        title = (doc.get("title") or "").strip()
        author_list: list[str] = doc.get("author_name") or []
        author = author_list[0].strip() if author_list else ""

        if not title or not author:
            return False

        # -- Deduplicate by ISBN (preferred) or title+author --
        isbns: list[str] = doc.get("isbn") or []
        isbn = _pick_isbn(isbns)

        if isbn and self.db.query(Book).filter_by(isbn=isbn).first():
            logger.debug("Skip (isbn): %s", title)
            return False

        if self.db.query(Book).filter_by(title=title, author=author).first():
            logger.debug("Skip (title+author): %s", title)
            return False

        # -- Description --
        description = _extract_first_sentence(doc.get("first_sentence"))
        work_key: Optional[str] = doc.get("key")
        if work_key and not description:
            description = self._fetch_work_description(work_key)

        # -- Cover --
        cover_id = doc.get("cover_i")
        cover_url = _COVER_URL.format(cover_id=cover_id) if cover_id else None

        # -- Genres --
        subjects: list[str] = doc.get("subject") or []
        genres = _resolve_genres(subjects, primary_genre)

        book = Book(
            id=str(uuid.uuid4()),
            title=title,
            author=author,
            description=description,
            pages=doc.get("number_of_pages_median"),
            published_year=doc.get("first_publish_year"),
            isbn=isbn,
            cover_url=cover_url,
        )
        self.db.add(book)
        self.db.flush()

        for genre in genres:
            self.db.add(BookGenre(id=str(uuid.uuid4()), book_id=book.id, genre=genre))

        self.db.commit()
        logger.debug("Imported: %s — %s", author, title)
        return True


# ------------------------------------------------------------------ #
# Pure helpers (no DB access)                                          #
# ------------------------------------------------------------------ #

def _pick_isbn(isbns: list[str]) -> Optional[str]:
    """Prefer ISBN-13; fall back to ISBN-10."""
    isbn13 = next((i for i in isbns if len(i) == 13), None)
    isbn10 = next((i for i in isbns if len(i) == 10), None)
    return isbn13 or isbn10


def _extract_first_sentence(raw) -> Optional[str]:
    if isinstance(raw, dict):
        return raw.get("value")
    if isinstance(raw, str):
        return raw
    return None


def _resolve_genres(subjects: list[str], primary_genre: str) -> list[str]:
    resolved = {primary_genre}
    for subj in subjects[:50]:  # cap to avoid scanning huge subject lists
        mapped = _SUBJECT_MAP.get(subj.lower())
        if mapped:
            resolved.add(mapped)
    return list(resolved & _VALID_GENRES)
