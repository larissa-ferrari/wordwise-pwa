import uuid
from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select

from app.core.deps import DB
from app.core.security import create_access_token, hash_password, verify_password
from app.models.user import User
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(body: RegisterRequest, db: DB):
    if db.scalar(select(User).where(User.email == body.email)):
        raise HTTPException(status_code=400, detail="Email already registered")
    if db.scalar(select(User).where(User.username == body.username)):
        raise HTTPException(status_code=400, detail="Username already taken")

    user = User(
        id=str(uuid.uuid4()),
        username=body.username,
        email=body.email,
        hashed_password=hash_password(body.password),
        display_name=body.display_name,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return TokenResponse(access_token=create_access_token(user.id))


@router.post("/login", response_model=TokenResponse)
def login(body: LoginRequest, db: DB):
    user = db.scalar(select(User).where(User.email == body.email))
    if not user or not verify_password(body.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return TokenResponse(access_token=create_access_token(user.id))
