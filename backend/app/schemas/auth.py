from pydantic import BaseModel, EmailStr


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str
    display_name: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
