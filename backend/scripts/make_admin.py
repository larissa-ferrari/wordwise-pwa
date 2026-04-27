"""
Promote a user to admin role.

Usage (from backend/ directory):
    python scripts/make_admin.py <email>
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.database import SessionLocal
from app.models.user import User


def main() -> None:
    if len(sys.argv) != 2:
        print("Usage: python scripts/make_admin.py <email>")
        sys.exit(1)

    email = sys.argv[1].strip()
    db = SessionLocal()
    try:
        user = db.query(User).filter_by(email=email).first()
        if not user:
            print(f"User not found: {email}")
            sys.exit(1)
        user.is_admin = True
        db.commit()
        print(f"✓ {user.display_name} ({email}) is now an admin.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
