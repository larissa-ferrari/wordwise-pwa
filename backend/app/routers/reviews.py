import uuid
from typing import Optional

from fastapi import APIRouter, HTTPException, Query
from sqlalchemy import select, func

from app.core.deps import CurrentUser, DB
from app.models.book import Book
from app.models.review import Review, ReviewEmotion
from app.models.user import User
from app.schemas.review import ReviewCreate, ReviewOut, ReviewUpdate
from app.schemas.book import BookSummary
from app.schemas.user import UserPublic
from app.schemas.common import CursorPage

router = APIRouter(prefix="/reviews", tags=["reviews"])


def _review_out(review: Review, db) -> ReviewOut:
    user = db.get(User, review.user_id)
    book = db.get(Book, review.book_id)

    user_pub = UserPublic(
        id=user.id,
        username=user.username,
        display_name=user.display_name,
        bio=user.bio,
        aesthetic=user.aesthetic,
        reading_streak=user.reading_streak,
        created_at=user.created_at,
    )
    book_sum = BookSummary(
        id=book.id,
        title=book.title,
        author=book.author,
        cover_gradient=book.cover_gradient,
        avg_rating=book.avg_rating,
        genres=[bg.genre for bg in book.genres],
    )
    emotions = [re.emotion for re in review.emotions]
    helpful_pct = (
        int(review.helpful_count / review.likes_count * 100) if review.likes_count else 0
    )
    return ReviewOut(
        id=review.id,
        user=user_pub,
        book=book_sum,
        rating=review.rating,
        text=review.text,
        favorite_quote=review.favorite_quote,
        emotions=emotions,
        likes_count=review.likes_count,
        helpful_count=review.helpful_count,
        helpful_percentage=helpful_pct,
        created_at=review.created_at,
    )


def _recalc_book_rating(book_id: str, db):
    avg = db.scalar(select(func.avg(Review.rating)).where(Review.book_id == book_id))
    cnt = db.scalar(select(func.count()).select_from(Review).where(Review.book_id == book_id))
    book = db.get(Book, book_id)
    if book:
        book.avg_rating = round(avg or 0.0, 2)
        book.rating_count = cnt or 0


@router.get("", response_model=CursorPage[ReviewOut])
def list_reviews(
    db: DB,
    book_id: Optional[str] = Query(None),
    user_id: Optional[str] = Query(None),
    cursor: Optional[str] = Query(None),
    limit: int = Query(20, le=100),
):
    stmt = select(Review).order_by(Review.created_at.desc())
    if book_id:
        stmt = stmt.where(Review.book_id == book_id)
    if user_id:
        stmt = stmt.where(Review.user_id == user_id)
    if cursor:
        stmt = stmt.where(Review.id < cursor)

    reviews = db.scalars(stmt.limit(limit + 1)).all()
    has_next = len(reviews) > limit
    items = reviews[:limit]
    next_cursor = items[-1].id if has_next and items else None

    return CursorPage(
        items=[_review_out(r, db) for r in items],
        next_cursor=next_cursor,
        has_next=has_next,
    )


@router.post("", response_model=ReviewOut, status_code=201)
def create_review(body: ReviewCreate, current_user: CurrentUser, db: DB):
    book = db.get(Book, body.book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    existing = db.scalar(
        select(Review).where(Review.user_id == current_user.id, Review.book_id == body.book_id)
    )
    if existing:
        raise HTTPException(status_code=409, detail="Review already exists for this book")

    review = Review(
        id=str(uuid.uuid4()),
        user_id=current_user.id,
        book_id=body.book_id,
        rating=body.rating,
        text=body.text,
        favorite_quote=body.favorite_quote,
    )
    db.add(review)
    db.flush()

    for emotion in set(body.emotions):
        db.add(ReviewEmotion(id=str(uuid.uuid4()), review_id=review.id, emotion=emotion))

    _recalc_book_rating(body.book_id, db)
    db.commit()
    db.refresh(review)
    return _review_out(review, db)


@router.get("/{review_id}", response_model=ReviewOut)
def get_review(review_id: str, db: DB):
    review = db.get(Review, review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    return _review_out(review, db)


@router.patch("/{review_id}", response_model=ReviewOut)
def update_review(review_id: str, body: ReviewUpdate, current_user: CurrentUser, db: DB):
    review = db.get(Review, review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    if review.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")

    if body.rating is not None:
        review.rating = body.rating
    if body.text is not None:
        review.text = body.text
    if body.favorite_quote is not None:
        review.favorite_quote = body.favorite_quote
    if body.emotions is not None:
        for e in list(review.emotions):
            db.delete(e)
        db.flush()
        for emotion in set(body.emotions):
            db.add(ReviewEmotion(id=str(uuid.uuid4()), review_id=review.id, emotion=emotion))

    _recalc_book_rating(review.book_id, db)
    db.commit()
    db.refresh(review)
    return _review_out(review, db)


@router.delete("/{review_id}", status_code=204)
def delete_review(review_id: str, current_user: CurrentUser, db: DB):
    review = db.get(Review, review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    if review.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    book_id = review.book_id
    db.delete(review)
    _recalc_book_rating(book_id, db)
    db.commit()


@router.post("/{review_id}/like", status_code=204)
def like_review(review_id: str, current_user: CurrentUser, db: DB):
    review = db.get(Review, review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    review.likes_count += 1
    db.commit()
