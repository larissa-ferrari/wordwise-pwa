from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, field_validator

from app.schemas.user import UserPublic
from app.schemas.book import BookSummary


class ReviewCreate(BaseModel):
    book_id: str
    rating: float
    text: Optional[str] = None
    favorite_quote: Optional[str] = None
    emotions: List[str] = []

    @field_validator("rating")
    @classmethod
    def rating_range(cls, v: float) -> float:
        if not 1 <= v <= 5:
            raise ValueError("Rating must be between 1 and 5")
        return round(v * 2) / 2  # snap to 0.5 steps


class ReviewUpdate(BaseModel):
    rating: Optional[float] = None
    text: Optional[str] = None
    favorite_quote: Optional[str] = None
    emotions: Optional[List[str]] = None


class ReviewOut(BaseModel):
    id: str
    user: UserPublic
    book: BookSummary
    rating: float
    text: Optional[str] = None
    favorite_quote: Optional[str] = None
    emotions: List[str] = []
    likes_count: int
    helpful_count: int
    helpful_percentage: int = 0
    created_at: datetime

    model_config = {"from_attributes": True}


class EmotionBreakdown(BaseModel):
    emotion: str
    label: str
    count: int
    percentage: float
