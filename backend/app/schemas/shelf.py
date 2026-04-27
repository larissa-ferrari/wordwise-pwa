from datetime import datetime
from typing import Optional
from pydantic import BaseModel

from app.schemas.book import BookOut


class ShelfEntryCreate(BaseModel):
    book_id: str
    shelf: str
    current_page: Optional[int] = None


class ShelfEntryUpdate(BaseModel):
    shelf: Optional[str] = None
    current_page: Optional[int] = None


class ShelfEntryOut(BaseModel):
    id: str
    book: BookOut
    shelf: str
    current_page: Optional[int] = None
    progress_percentage: float = 0.0
    added_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
