from typing import Generic, List, Optional, TypeVar
from pydantic import BaseModel

T = TypeVar("T")


class PaginatedResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int
    page: int
    page_size: int
    has_next: bool


class CursorPage(BaseModel, Generic[T]):
    items: List[T]
    next_cursor: Optional[str] = None
    has_next: bool
