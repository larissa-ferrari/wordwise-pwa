import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import String, Text, ForeignKey, CHAR, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.enums import AestheticEnum


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    display_name: Mapped[str] = mapped_column(String(100), nullable=False)
    bio: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    aesthetic: Mapped[Optional[str]] = mapped_column(
        String(20), nullable=True, default=AestheticEnum.dark_academia.value
    )
    avatar_color: Mapped[Optional[str]] = mapped_column(String(7), nullable=True)
    is_admin: Mapped[bool] = mapped_column(default=False)
    reading_streak: Mapped[int] = mapped_column(default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    reviews: Mapped[list["Review"]] = relationship("Review", back_populates="user", cascade="all, delete-orphan")
    shelf_entries: Mapped[list["ShelfEntry"]] = relationship("ShelfEntry", back_populates="user", cascade="all, delete-orphan")
    followers: Mapped[list["UserFollow"]] = relationship("UserFollow", foreign_keys="UserFollow.following_id", back_populates="following")
    following: Mapped[list["UserFollow"]] = relationship("UserFollow", foreign_keys="UserFollow.follower_id", back_populates="follower")


class UserFollow(Base):
    __tablename__ = "user_follows"

    follower_id: Mapped[str] = mapped_column(CHAR(36), ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    following_id: Mapped[str] = mapped_column(CHAR(36), ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    follower: Mapped["User"] = relationship("User", foreign_keys=[follower_id], back_populates="following")
    following: Mapped["User"] = relationship("User", foreign_keys=[following_id], back_populates="followers")
