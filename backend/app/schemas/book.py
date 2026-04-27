from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel


class TropeOut(BaseModel):
    id: str
    name: str
    slug: str

    model_config = {"from_attributes": True}


class BookBase(BaseModel):
    title: str
    author: str
    series: Optional[str] = None
    cover_gradient: Optional[str] = None
    description: Optional[str] = None
    pages: Optional[int] = None
    published_year: Optional[int] = None


class BookCreate(BookBase):
    genres: List[str] = []
    trope_ids: List[str] = []


class BookOut(BookBase):
    id: str
    avg_rating: float
    rating_count: int
    genres: List[str] = []
    tropes: List[TropeOut] = []
    created_at: datetime

    model_config = {"from_attributes": True}


class BookSummary(BaseModel):
    id: str
    title: str
    author: str
    cover_gradient: Optional[str] = None
    avg_rating: float
    genres: List[str] = []

    model_config = {"from_attributes": True}
