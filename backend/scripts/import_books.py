"""
Import books from the Open Library API into the WordWise database.

Usage (run from the backend/ directory):

    # Import all genres with defaults (50 books each)
    python scripts/import_books.py

    # Import specific genres
    python scripts/import_books.py --genres fantasy romance

    # Import more books with a slower rate to be polite
    python scripts/import_books.py --genres fantasy --limit 200 --delay 1.5

    # Dry-run to see what would be fetched (no DB writes)
    python scripts/import_books.py --dry-run

Available genre keys:
    fantasy, romance, thriller, literary_fiction,
    science_fiction, horror, nonfiction, manga
"""
import argparse
import logging
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.database import SessionLocal
from app.jobs.open_library import IMPORT_SUBJECTS, OpenLibraryImporter

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Import books from Open Library API",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "--genres",
        nargs="+",
        choices=list(IMPORT_SUBJECTS.keys()),
        metavar="GENRE",
        default=None,
        help="Genres to import. Omit to import all. "
             f"Choices: {', '.join(IMPORT_SUBJECTS.keys())}",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=50,
        metavar="N",
        help="Max new books per genre (default: 50)",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=1.0,
        metavar="SECONDS",
        help="Delay between API requests in seconds (default: 1.0). "
             "Increase to reduce load on Open Library servers.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Fetch and log books without writing to the database.",
    )
    parser.add_argument(
        "--verbose",
        "-v",
        action="store_true",
        help="Show DEBUG-level logs (individual book names).",
    )
    return parser


def main() -> None:
    args = build_parser().parse_args()

    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)

    if args.dry_run:
        logger.info("DRY RUN — no database writes will be performed")

    db = SessionLocal()
    importer = OpenLibraryImporter(db, request_delay=args.delay)

    try:
        if args.dry_run:
            # Import into a transaction that we roll back at the end
            from sqlalchemy import event

            @event.listens_for(db, "after_transaction_end")
            def _rollback(session, transaction):
                pass

            stats = importer.run(genres=args.genres, books_per_genre=args.limit)
            db.rollback()
        else:
            stats = importer.run(genres=args.genres, books_per_genre=args.limit)

        print(
            f"\nDone — imported: {stats['imported']}  "
            f"skipped: {stats['skipped']}  "
            f"errors: {stats['errors']}"
        )
        sys.exit(1 if stats["errors"] > 0 else 0)

    except KeyboardInterrupt:
        logger.warning("Interrupted by user")
        db.rollback()
        sys.exit(130)

    finally:
        importer.close()
        db.close()


if __name__ == "__main__":
    main()
