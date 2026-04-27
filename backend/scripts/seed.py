"""
Seed the database with initial data: tropes and sample books.

Usage (from backend/ directory):
    python scripts/seed.py
"""
import sys
import uuid
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.database import SessionLocal
from app.models.book import Book, BookGenre, BookTrope, Trope

TROPES = [
    ("Enemies to Lovers",    "enemies-to-lovers"),
    ("Chosen One",           "chosen-one"),
    ("Slow Burn",            "slow-burn"),
    ("Found Family",         "found-family"),
    ("Redemption Arc",       "redemption-arc"),
    ("Unreliable Narrator",  "unreliable-narrator"),
    ("Time Travel",          "time-travel"),
    ("Second Chance",        "second-chance"),
    ("Forbidden Love",       "forbidden-love"),
    ("Dark Academia",        "dark-academia"),
    ("Magic School",         "magic-school"),
    ("Frame Story",          "frame-story"),
    ("Antihero",             "antihero"),
]

BOOKS = [
    {
        "title": "O Nome do Vento",
        "author": "Patrick Rothfuss",
        "series": "A Crônica do Matador do Rei #1",
        "cover_gradient": "from-[#c8a96e] to-[#e8635a]",
        "description": (
            "Meu nome é Kvothe. Nomes são importantes, pois dizem muito sobre uma pessoa. "
            "Já fui chamado de Kvothe, o Sem-Sangue; Kvothe, o Arcano; e Kvothe, o Matador de Reis."
        ),
        "pages": 672,
        "published_year": 2007,
        "genres": ["fantasy"],
        "trope_slugs": ["chosen-one", "magic-school", "frame-story", "unreliable-narrator"],
    },
    {
        "title": "Fourth Wing",
        "author": "Rebecca Yarros",
        "series": "The Empyrean #1",
        "cover_gradient": "from-[#e8635a] to-[#b87cde]",
        "description": "At Basgiath War College, you either graduate or you die.",
        "pages": 528,
        "published_year": 2023,
        "genres": ["fantasy", "romance"],
        "trope_slugs": ["enemies-to-lovers", "slow-burn", "chosen-one"],
    },
    {
        "title": "Project Hail Mary",
        "author": "Andy Weir",
        "cover_gradient": "from-[#6a9fcf] to-[#b87cde]",
        "description": "A lone astronaut must save Earth, but first he has to remember who he is.",
        "pages": 476,
        "published_year": 2021,
        "genres": ["scifi"],
        "trope_slugs": ["found-family"],
    },
    {
        "title": "The Housemaid",
        "author": "Freida McFadden",
        "cover_gradient": "from-[#1a1210] to-[#e8635a]",
        "description": "Welcome to the family. Just don't make any mistakes.",
        "pages": 336,
        "published_year": 2022,
        "genres": ["thriller"],
        "trope_slugs": ["unreliable-narrator"],
    },
    {
        "title": "The Seven Husbands of Evelyn Hugo",
        "author": "Taylor Jenkins Reid",
        "cover_gradient": "from-[#c8a96e] to-[#e8635a]",
        "description": (
            "Aging Hollywood starlet Evelyn Hugo is finally ready to tell the truth "
            "about her glamorous and scandalous life."
        ),
        "pages": 400,
        "published_year": 2017,
        "genres": ["literary", "romance"],
        "trope_slugs": ["second-chance", "forbidden-love"],
    },
    {
        "title": "Cem Anos de Solidão",
        "author": "Gabriel García Márquez",
        "cover_gradient": "from-[#7c9e7a] to-[#c8a96e]",
        "description": "A história da família Buendía ao longo de sete gerações na fictícia cidade de Macondo.",
        "pages": 448,
        "published_year": 1967,
        "genres": ["literary"],
        "trope_slugs": ["frame-story"],
    },
    {
        "title": "Neuromancer",
        "author": "William Gibson",
        "cover_gradient": "from-[#6a9fcf] to-[#b87cde]",
        "description": "The sky above the port was the color of television, tuned to a dead channel.",
        "pages": 271,
        "published_year": 1984,
        "genres": ["scifi"],
        "trope_slugs": ["antihero"],
    },
    {
        "title": "Iron Flame",
        "author": "Rebecca Yarros",
        "series": "The Empyrean #2",
        "cover_gradient": "from-[#b87cde] to-[#e8635a]",
        "description": "Everyone expected Violet Sorrengail to die during her first year.",
        "pages": 623,
        "published_year": 2023,
        "genres": ["fantasy", "romance"],
        "trope_slugs": ["enemies-to-lovers", "slow-burn"],
    },
]


def main():
    db = SessionLocal()
    try:
        trope_map: dict[str, str] = {}
        for name, slug in TROPES:
            existing = db.query(Trope).filter_by(slug=slug).first()
            if not existing:
                t = Trope(id=str(uuid.uuid4()), name=name, slug=slug)
                db.add(t)
                db.flush()
                trope_map[slug] = t.id
                print(f"  Trope: {name}")
            else:
                trope_map[slug] = existing.id
        db.commit()

        for data in BOOKS:
            existing = db.query(Book).filter_by(title=data["title"], author=data["author"]).first()
            if existing:
                print(f"  Skip (exists): {data['title']}")
                continue

            book = Book(
                id=str(uuid.uuid4()),
                title=data["title"],
                author=data["author"],
                series=data.get("series"),
                cover_gradient=data.get("cover_gradient"),
                description=data.get("description"),
                pages=data.get("pages"),
                published_year=data.get("published_year"),
            )
            db.add(book)
            db.flush()

            for genre in data.get("genres", []):
                db.add(BookGenre(id=str(uuid.uuid4()), book_id=book.id, genre=genre))

            for slug in data.get("trope_slugs", []):
                if slug in trope_map:
                    db.add(BookTrope(book_id=book.id, trope_id=trope_map[slug]))

            db.commit()
            print(f"  Book: {data['title']}")

        print("\nSeed complete.")
    finally:
        db.close()


if __name__ == "__main__":
    print("Seeding database...")
    main()
