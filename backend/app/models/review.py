import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import String, Text, Integer, Float, ForeignKey, CHAR, DateTime, func, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Review(Base):
    __tablename__ = "reviews"

    id: Mapped[str] = mapped_column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(CHAR(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    book_id: Mapped[str] = mapped_column(CHAR(36), ForeignKey("books.id", ondelete="CASCADE"), nullable=False)
    rating: Mapped[float] = mapped_column(Float, nullable=False)
    text: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    favorite_quote: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    likes_count: Mapped[int] = mapped_column(Integer, default=0)
    helpful_count: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    user: Mapped["User"] = relationship("User", back_populates="reviews")
    book: Mapped["Book"] = relationship("Book", back_populates="reviews")
    emotions: Mapped[list["ReviewEmotion"]] = relationship("ReviewEmotion", back_populates="review", cascade="all, delete-orphan")


class ReviewEmotion(Base):
    __tablename__ = "review_emotions"
    __table_args__ = (UniqueConstraint("review_id", "emotion"),)

    id: Mapped[str] = mapped_column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    review_id: Mapped[str] = mapped_column(CHAR(36), ForeignKey("reviews.id", ondelete="CASCADE"), nullable=False)
    emotion: Mapped[str] = mapped_column(String(20), nullable=False)

    review: Mapped["Review"] = relationship("Review", back_populates="emotions")
