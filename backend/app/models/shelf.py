import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import String, Integer, Float, ForeignKey, CHAR, DateTime, func, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class ShelfEntry(Base):
    __tablename__ = "shelf_entries"
    __table_args__ = (UniqueConstraint("user_id", "book_id"),)

    id: Mapped[str] = mapped_column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(CHAR(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    book_id: Mapped[str] = mapped_column(CHAR(36), ForeignKey("books.id", ondelete="CASCADE"), nullable=False)
    shelf: Mapped[str] = mapped_column(String(10), nullable=False)
    current_page: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    added_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    user: Mapped["User"] = relationship("User", back_populates="shelf_entries")
    book: Mapped["Book"] = relationship("Book", back_populates="shelf_entries")
