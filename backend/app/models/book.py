import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import String, Text, Float, Integer, ForeignKey, CHAR, DateTime, func, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Trope(Base):
    __tablename__ = "tropes"

    id: Mapped[str] = mapped_column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    slug: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)

    books: Mapped[list["BookTrope"]] = relationship("BookTrope", back_populates="trope")


class Book(Base):
    __tablename__ = "books"

    id: Mapped[str] = mapped_column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    author: Mapped[str] = mapped_column(String(255), nullable=False)
    series: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    cover_gradient: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    pages: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    published_year: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    isbn: Mapped[Optional[str]] = mapped_column(String(20), nullable=True, unique=True)
    avg_rating: Mapped[float] = mapped_column(Float, default=0.0)
    rating_count: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    genres: Mapped[list["BookGenre"]] = relationship("BookGenre", back_populates="book", cascade="all, delete-orphan")
    tropes: Mapped[list["BookTrope"]] = relationship("BookTrope", back_populates="book", cascade="all, delete-orphan")
    reviews: Mapped[list["Review"]] = relationship("Review", back_populates="book", cascade="all, delete-orphan")
    shelf_entries: Mapped[list["ShelfEntry"]] = relationship("ShelfEntry", back_populates="book", cascade="all, delete-orphan")


class BookGenre(Base):
    __tablename__ = "book_genres"
    __table_args__ = (UniqueConstraint("book_id", "genre"),)

    id: Mapped[str] = mapped_column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    book_id: Mapped[str] = mapped_column(CHAR(36), ForeignKey("books.id", ondelete="CASCADE"), nullable=False)
    genre: Mapped[str] = mapped_column(String(20), nullable=False)

    book: Mapped["Book"] = relationship("Book", back_populates="genres")


class BookTrope(Base):
    __tablename__ = "book_tropes"
    __table_args__ = (UniqueConstraint("book_id", "trope_id"),)

    book_id: Mapped[str] = mapped_column(CHAR(36), ForeignKey("books.id", ondelete="CASCADE"), primary_key=True)
    trope_id: Mapped[str] = mapped_column(CHAR(36), ForeignKey("tropes.id", ondelete="CASCADE"), primary_key=True)

    book: Mapped["Book"] = relationship("Book", back_populates="tropes")
    trope: Mapped["Trope"] = relationship("Trope", back_populates="books")
