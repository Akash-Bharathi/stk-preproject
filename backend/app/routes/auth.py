from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal

from app.schemas.user_schema import (
    UserRegister,
    UserLogin
)

from app.utils.hashing import (
    hash_password,
    verify_password
)

from app.utils.jwt_handler import create_access_token

from app.database.crud import (
    get_user_by_email,
    create_user
)

router = APIRouter()


# Register
@router.post("/register")
def register(user: UserRegister):

    db: Session = SessionLocal()

    existing_user = get_user_by_email(
        db,
        user.email
    )

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    create_user(
        db,
        user.email,
        hash_password(user.password)
    )

    return {
        "success": True,
        "message": "User registered successfully"
    }


# Login
@router.post("/login")
def login(user: UserLogin):

    db: Session = SessionLocal()

    existing_user = get_user_by_email(
        db,
        user.email
    )

    if not existing_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(
        user.password,
        existing_user.password
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {"sub": existing_user.email}
    )

    return {
        "success": True,
        "access_token": token
    }