import uuid
from typing import Optional

from fastapi import APIRouter, HTTPException, Query
from sqlalchemy import select

from app.core.deps import CurrentUser, DB
from app.models.book import Book
from app.models.shelf import ShelfEntry
from app.schemas.shelf import ShelfEntryCreate, ShelfEntryOut, ShelfEntryUpdate
from app.schemas.book import BookOut

router = APIRouter(prefix="/shelves", tags=["shelves"])


def _entry_out(entry: ShelfEntry, db) -> ShelfEntryOut:
    book = db.get(Book, entry.book_id)
    progress = 0.0
    if book and book.pages and entry.current_page:
        progress = round(entry.current_page / book.pages * 100, 1)

    book_out = BookOut(
        id=book.id,
        title=book.title,
        author=book.author,
        series=book.series,
        cover_gradient=book.cover_gradient,
        description=book.description,
        pages=book.pages,
        published_year=book.published_year,
        avg_rating=book.avg_rating,
        rating_count=book.rating_count,
        genres=[bg.genre for bg in book.genres],
        tropes=[],
        created_at=book.created_at,
    )
    return ShelfEntryOut(
        id=entry.id,
        book=book_out,
        shelf=entry.shelf,
        current_page=entry.current_page,
        progress_percentage=progress,
        added_at=entry.added_at,
        updated_at=entry.updated_at,
    )


@router.get("", response_model=list[ShelfEntryOut])
def get_shelf(
    current_user: CurrentUser,
    db: DB,
    shelf: Optional[str] = Query(None),
):
    stmt = select(ShelfEntry).where(ShelfEntry.user_id == current_user.id)
    if shelf:
        stmt = stmt.where(ShelfEntry.shelf == shelf)
    entries = db.scalars(stmt.order_by(ShelfEntry.updated_at.desc())).all()
    return [_entry_out(e, db) for e in entries]


@router.post("", response_model=ShelfEntryOut, status_code=201)
def add_to_shelf(body: ShelfEntryCreate, current_user: CurrentUser, db: DB):
    book = db.get(Book, body.book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    existing = db.scalar(
        select(ShelfEntry).where(
            ShelfEntry.user_id == current_user.id, ShelfEntry.book_id == body.book_id
        )
    )
    if existing:
        existing.shelf = body.shelf
        if body.current_page is not None:
            existing.current_page = body.current_page
        db.commit()
        db.refresh(existing)
        return _entry_out(existing, db)

    entry = ShelfEntry(
        id=str(uuid.uuid4()),
        user_id=current_user.id,
        book_id=body.book_id,
        shelf=body.shelf,
        current_page=body.current_page,
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return _entry_out(entry, db)


@router.patch("/{entry_id}", response_model=ShelfEntryOut)
def update_shelf_entry(entry_id: str, body: ShelfEntryUpdate, current_user: CurrentUser, db: DB):
    entry = db.get(ShelfEntry, entry_id)
    if not entry or entry.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Entry not found")
    if body.shelf is not None:
        entry.shelf = body.shelf
    if body.current_page is not None:
        entry.current_page = body.current_page
    db.commit()
    db.refresh(entry)
    return _entry_out(entry, db)


@router.delete("/{entry_id}", status_code=204)
def remove_from_shelf(entry_id: str, current_user: CurrentUser, db: DB):
    entry = db.get(ShelfEntry, entry_id)
    if not entry or entry.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Entry not found")
    db.delete(entry)
    db.commit()
