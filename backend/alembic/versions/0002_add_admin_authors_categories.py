"""add is_admin to users, authors table, categories table, book_categories, author_id to books

Revision ID: 0002
Revises: 0001
Create Date: 2026-04-27
"""
from alembic import op
import sqlalchemy as sa

revision = "0002"
down_revision = "0001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # users: is_admin flag
    op.add_column("users", sa.Column("is_admin", sa.Boolean(), nullable=False, server_default="false"))

    # authors
    op.create_table(
        "authors",
        sa.Column("id", sa.CHAR(36), primary_key=True),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column("bio", sa.Text(), nullable=True),
        sa.Column("photo_url", sa.String(500), nullable=True),
        sa.Column("birth_year", sa.Integer(), nullable=True),
        sa.Column("nationality", sa.String(100), nullable=True),
        sa.Column("created_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False),
    )

    # books: author_id FK
    op.add_column("books", sa.Column("author_id", sa.CHAR(36), nullable=True))
    op.create_foreign_key("fk_books_author_id", "books", "authors", ["author_id"], ["id"], ondelete="SET NULL")

    # categories
    op.create_table(
        "categories",
        sa.Column("id", sa.CHAR(36), primary_key=True),
        sa.Column("name", sa.String(100), nullable=False, unique=True),
        sa.Column("slug", sa.String(100), nullable=False, unique=True),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False),
    )

    # book_categories
    op.create_table(
        "book_categories",
        sa.Column("book_id", sa.CHAR(36), sa.ForeignKey("books.id", ondelete="CASCADE"), primary_key=True),
        sa.Column("category_id", sa.CHAR(36), sa.ForeignKey("categories.id", ondelete="CASCADE"), primary_key=True),
        sa.UniqueConstraint("book_id", "category_id"),
    )


def downgrade() -> None:
    op.drop_table("book_categories")
    op.drop_table("categories")
    op.drop_constraint("fk_books_author_id", "books", type_="foreignkey")
    op.drop_column("books", "author_id")
    op.drop_table("authors")
    op.drop_column("users", "is_admin")
