"""add cover_url to books

Revision ID: 0001
Revises:
Create Date: 2026-04-27
"""
from alembic import op
import sqlalchemy as sa

revision = "0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("books", sa.Column("cover_url", sa.String(500), nullable=True))


def downgrade() -> None:
    op.drop_column("books", "cover_url")
