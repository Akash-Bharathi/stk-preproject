from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from app.database.connection import SessionLocal
from app.models.user import User
from app.schemas.user_schema import UserRegister, UserLogin
from app.utils.hashing import hash_password, verify_password
from app.utils.jwt_handler import create_access_token

router = APIRouter()

@router.post("/register")
def register(user: UserRegister):

    db: Session = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_user = User(
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()

    return {"message": "User registered successfully"}

@router.post("/login")
def login(user: UserLogin):

    db: Session = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

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

    return {"access_token": token}