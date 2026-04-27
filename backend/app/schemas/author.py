from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class AuthorBase(BaseModel):
    name: str
    bio: Optional[str] = None
    photo_url: Optional[str] = None
    birth_year: Optional[int] = None
    nationality: Optional[str] = None


class AuthorCreate(AuthorBase):
    pass


class AuthorUpdate(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    photo_url: Optional[str] = None
    birth_year: Optional[int] = None
    nationality: Optional[str] = None


class AuthorOut(AuthorBase):
    id: str
    created_at: datetime
    books_count: int = 0

    model_config = {"from_attributes": True}
