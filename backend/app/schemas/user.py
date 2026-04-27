from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    username: str
    display_name: str
    bio: Optional[str] = None
    aesthetic: Optional[str] = None


class UserPublic(UserBase):
    id: str
    is_admin: bool = False
    books_read_count: int = 0
    reviews_count: int = 0
    followers_count: int = 0
    following_count: int = 0
    reading_streak: int = 0
    created_at: datetime

    model_config = {"from_attributes": True}


class UserProfile(UserPublic):
    avg_rating: Optional[float] = None
    is_following: bool = False
    compatibility: Optional[int] = None


class UserUpdate(BaseModel):
    display_name: Optional[str] = None
    bio: Optional[str] = None
    aesthetic: Optional[str] = None


class UserCompatibility(BaseModel):
    user: UserPublic
    compatibility: int
