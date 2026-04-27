"""
Create all database tables from scratch.

Usage (from backend/ directory):
    python scripts/init_db.py
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.database import engine, Base
import app.models  # noqa: F401 — registers all ORM models


def main():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("All tables created successfully.")
    print("\nTables:")
    from sqlalchemy import inspect
    inspector = inspect(engine)
    for table in sorted(inspector.get_table_names()):
        print(f"  - {table}")


if __name__ == "__main__":
    main()
