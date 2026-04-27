from fastapi import APIRouter, HTTPException, Query
from sqlalchemy import select, func

from app.core.deps import CurrentUser, DB
from app.models.user import User, UserFollow
from app.models.review import Review
from app.models.shelf import ShelfEntry
from app.schemas.user import UserProfile, UserPublic, UserUpdate, UserCompatibility
from app.schemas.common import PaginatedResponse

router = APIRouter(prefix="/users", tags=["users"])


def _build_profile(user: User, current_user: User | None, db) -> UserProfile:
    books_read = db.scalar(
        select(func.count()).select_from(ShelfEntry).where(
            ShelfEntry.user_id == user.id, ShelfEntry.shelf == "read"
        )
    ) or 0
    reviews_count = db.scalar(
        select(func.count()).select_from(Review).where(Review.user_id == user.id)
    ) or 0
    followers_count = db.scalar(
        select(func.count()).select_from(UserFollow).where(UserFollow.following_id == user.id)
    ) or 0
    following_count = db.scalar(
        select(func.count()).select_from(UserFollow).where(UserFollow.follower_id == user.id)
    ) or 0
    is_following = False
    if current_user and current_user.id != user.id:
        is_following = bool(
            db.scalar(
                select(UserFollow).where(
                    UserFollow.follower_id == current_user.id,
                    UserFollow.following_id == user.id,
                )
            )
        )
    avg_rating = db.scalar(
        select(func.avg(Review.rating)).where(Review.user_id == user.id)
    )
    return UserProfile(
        id=user.id,
        username=user.username,
        display_name=user.display_name,
        bio=user.bio,
        aesthetic=user.aesthetic,
        books_read_count=books_read,
        reviews_count=reviews_count,
        followers_count=followers_count,
        following_count=following_count,
        reading_streak=user.reading_streak,
        created_at=user.created_at,
        is_following=is_following,
        avg_rating=round(avg_rating, 1) if avg_rating else None,
    )


@router.get("/me", response_model=UserProfile)
def get_me(current_user: CurrentUser, db: DB):
    return _build_profile(current_user, current_user, db)


@router.patch("/me", response_model=UserProfile)
def update_me(body: UserUpdate, current_user: CurrentUser, db: DB):
    for field, value in body.model_dump(exclude_none=True).items():
        setattr(current_user, field, value)
    db.commit()
    db.refresh(current_user)
    return _build_profile(current_user, current_user, db)


@router.get("/{username}", response_model=UserProfile)
def get_user(username: str, current_user: CurrentUser, db: DB):
    user = db.scalar(select(User).where(User.username == username))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return _build_profile(user, current_user, db)


@router.post("/{username}/follow", status_code=204)
def follow_user(username: str, current_user: CurrentUser, db: DB):
    user = db.scalar(select(User).where(User.username == username))
    if not user or user.id == current_user.id:
        raise HTTPException(status_code=404, detail="User not found")
    existing = db.scalar(
        select(UserFollow).where(
            UserFollow.follower_id == current_user.id, UserFollow.following_id == user.id
        )
    )
    if not existing:
        db.add(UserFollow(follower_id=current_user.id, following_id=user.id))
        db.commit()


@router.delete("/{username}/follow", status_code=204)
def unfollow_user(username: str, current_user: CurrentUser, db: DB):
    user = db.scalar(select(User).where(User.username == username))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    follow = db.scalar(
        select(UserFollow).where(
            UserFollow.follower_id == current_user.id, UserFollow.following_id == user.id
        )
    )
    if follow:
        db.delete(follow)
        db.commit()


@router.get("/me/suggestions", response_model=list[UserCompatibility])
def get_suggestions(current_user: CurrentUser, db: DB, limit: int = Query(10, le=50)):
    read_book_ids = {
        row.book_id
        for row in db.scalars(
            select(ShelfEntry).where(
                ShelfEntry.user_id == current_user.id, ShelfEntry.shelf == "read"
            )
        )
    }
    if not read_book_ids:
        return []

    candidates = db.scalars(
        select(User)
        .where(User.id != current_user.id)
        .limit(100)
    ).all()

    result = []
    for candidate in candidates:
        other_ids = {
            row.book_id
            for row in db.scalars(
                select(ShelfEntry).where(
                    ShelfEntry.user_id == candidate.id, ShelfEntry.shelf == "read"
                )
            )
        }
        if not other_ids:
            continue
        intersection = read_book_ids & other_ids
        union = read_book_ids | other_ids
        compatibility = int(len(intersection) / len(union) * 100) if union else 0
        if compatibility > 0:
            profile = _build_profile(candidate, current_user, db)
            result.append(UserCompatibility(user=profile, compatibility=compatibility))

    result.sort(key=lambda x: x.compatibility, reverse=True)
    return result[:limit]
