from typing import Optional

from fastapi import APIRouter, Query
from sqlalchemy import select

from app.core.deps import CurrentUser, DB
from app.models.review import Review
from app.models.user import UserFollow
from app.routers.reviews import _review_out
from app.schemas.review import ReviewOut
from app.schemas.common import CursorPage

router = APIRouter(prefix="/feed", tags=["feed"])


@router.get("", response_model=CursorPage[ReviewOut])
def get_feed(
    current_user: CurrentUser,
    db: DB,
    cursor: Optional[str] = Query(None),
    limit: int = Query(20, le=100),
):
    following_ids = [
        row.following_id
        for row in db.scalars(
            select(UserFollow).where(UserFollow.follower_id == current_user.id)
        )
    ]
    user_ids = following_ids + [current_user.id]

    stmt = (
        select(Review)
        .where(Review.user_id.in_(user_ids))
        .order_by(Review.created_at.desc())
    )
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
