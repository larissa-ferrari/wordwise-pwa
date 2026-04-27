import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import String, Text, CHAR, DateTime, ForeignKey, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[str] = mapped_column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    slug: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    books: Mapped[list["BookCategory"]] = relationship("BookCategory", back_populates="category", cascade="all, delete-orphan")


class BookCategory(Base):
    __tablename__ = "book_categories"
    __table_args__ = (UniqueConstraint("book_id", "category_id"),)

    book_id: Mapped[str] = mapped_column(CHAR(36), ForeignKey("books.id", ondelete="CASCADE"), primary_key=True)
    category_id: Mapped[str] = mapped_column(CHAR(36), ForeignKey("categories.id", ondelete="CASCADE"), primary_key=True)

    book: Mapped["Book"] = relationship("Book", back_populates="categories")
    category: Mapped["Category"] = relationship("Category", back_populates="books")
