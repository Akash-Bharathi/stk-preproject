from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal
from app.models.favorite import Favorite
from app.models.user import User
from app.schemas.favorite_schema import FavoriteCreate
from app.utils.auth_dependency import get_current_user

router = APIRouter()

# Add favorite
@router.post("/favorites")
def add_favorite(
    favorite: FavoriteCreate,
    current_user = Depends(get_current_user)
):

    db: Session = SessionLocal()

    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    existing = db.query(Favorite).filter(
        Favorite.movie_id == favorite.movie_id,
        Favorite.user_id == user.id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Movie already in favorites"
        )

    new_favorite = Favorite(
        movie_id=favorite.movie_id,
        title=favorite.title,
        poster=favorite.poster,
        user_id=user.id
    )

    db.add(new_favorite)
    db.commit()

    return {"message": "Favorite added"}

# View favorites
@router.get("/favorites")
def get_favorites(
    current_user = Depends(get_current_user)
):

    db: Session = SessionLocal()

    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    favorites = db.query(Favorite).filter(
        Favorite.user_id == user.id
    ).all()

    return favorites

# Delete favorite
@router.delete("/favorites/{movie_id}")
def delete_favorite(
    movie_id: str,
    current_user = Depends(get_current_user)
):

    db: Session = SessionLocal()

    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    favorite = db.query(Favorite).filter(
        Favorite.movie_id == movie_id,
        Favorite.user_id == user.id
    ).first()

    if not favorite:
        raise HTTPException(
            status_code=404,
            detail="Favorite not found"
        )

    db.delete(favorite)
    db.commit()

    return {"message": "Favorite removed"}