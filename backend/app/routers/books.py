import uuid
from typing import Optional

from fastapi import APIRouter, HTTPException, Query
from sqlalchemy import select, func, or_

from app.core.deps import CurrentUser, DB
from app.models.book import Book, BookGenre, BookTrope, Trope
from app.models.review import Review, ReviewEmotion
from app.schemas.book import BookCreate, BookOut, BookSummary
from app.schemas.review import EmotionBreakdown
from app.schemas.common import PaginatedResponse

router = APIRouter(prefix="/books", tags=["books"])

EMOTION_LABELS = {
    "love": "Me apaixonei",
    "cried": "Chorei",
    "laughed": "Ri muito",
    "surprised": "Fui surpreendido",
    "irritated": "Me irritei",
    "absorbed": "Absorvido",
    "excited": "Animado",
    "peaceful": "Em paz",
}


def _book_out(book: Book, db) -> BookOut:
    genres = [bg.genre for bg in book.genres]
    tropes = [bt.trope for bt in book.tropes]
    return BookOut(
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
        genres=genres,
        tropes=tropes,
        created_at=book.created_at,
    )


@router.get("", response_model=PaginatedResponse[BookSummary])
def list_books(
    db: DB,
    q: Optional[str] = Query(None),
    genre: Optional[str] = Query(None),
    trope: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, le=100),
):
    stmt = select(Book)
    if q:
        stmt = stmt.where(or_(Book.title.ilike(f"%{q}%"), Book.author.ilike(f"%{q}%")))
    if genre:
        stmt = stmt.join(BookGenre).where(BookGenre.genre == genre)
    if trope:
        stmt = stmt.join(BookTrope).join(Trope).where(Trope.slug == trope)

    total = db.scalar(select(func.count()).select_from(stmt.subquery())) or 0
    books = db.scalars(stmt.offset((page - 1) * page_size).limit(page_size)).all()

    items = [
        BookSummary(
            id=b.id,
            title=b.title,
            author=b.author,
            cover_gradient=b.cover_gradient,
            avg_rating=b.avg_rating,
            genres=[bg.genre for bg in b.genres],
        )
        for b in books
    ]
    return PaginatedResponse(
        items=items, total=total, page=page, page_size=page_size, has_next=(page * page_size < total)
    )


@router.get("/trending", response_model=list[BookSummary])
def trending_books(db: DB, limit: int = Query(10, le=50)):
    books = db.scalars(
        select(Book).order_by(Book.rating_count.desc(), Book.avg_rating.desc()).limit(limit)
    ).all()
    return [
        BookSummary(
            id=b.id,
            title=b.title,
            author=b.author,
            cover_gradient=b.cover_gradient,
            avg_rating=b.avg_rating,
            genres=[bg.genre for bg in b.genres],
        )
        for b in books
    ]


@router.get("/{book_id}", response_model=BookOut)
def get_book(book_id: str, db: DB):
    book = db.get(Book, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return _book_out(book, db)


@router.get("/{book_id}/emotions", response_model=list[EmotionBreakdown])
def book_emotions(book_id: str, db: DB):
    book = db.get(Book, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    rows = db.execute(
        select(ReviewEmotion.emotion, func.count().label("cnt"))
        .join(Review)
        .where(Review.book_id == book_id)
        .group_by(ReviewEmotion.emotion)
        .order_by(func.count().desc())
    ).all()

    total = sum(r.cnt for r in rows)
    return [
        EmotionBreakdown(
            emotion=r.emotion,
            label=EMOTION_LABELS.get(r.emotion, r.emotion),
            count=r.cnt,
            percentage=round(r.cnt / total * 100, 1) if total else 0,
        )
        for r in rows
    ]


@router.post("", response_model=BookOut, status_code=201)
def create_book(body: BookCreate, current_user: CurrentUser, db: DB):
    book = Book(
        id=str(uuid.uuid4()),
        title=body.title,
        author=body.author,
        series=body.series,
        cover_gradient=body.cover_gradient,
        description=body.description,
        pages=body.pages,
        published_year=body.published_year,
    )
    db.add(book)
    db.flush()

    for genre in body.genres:
        db.add(BookGenre(id=str(uuid.uuid4()), book_id=book.id, genre=genre))

    for trope_id in body.trope_ids:
        trope = db.get(Trope, trope_id)
        if trope:
            db.add(BookTrope(book_id=book.id, trope_id=trope_id))

    db.commit()
    db.refresh(book)
    return _book_out(book, db)
