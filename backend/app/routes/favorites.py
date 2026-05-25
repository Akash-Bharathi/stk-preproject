# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session

# from app.database.connection import SessionLocal
# from app.models.favorite import Favorite
# from app.models.user import User
# from app.schemas.favorite_schema import FavoriteCreate
# from app.utils.auth_dependency import get_current_user


# router = APIRouter()

# # Add favorite
# @router.post("/favorites")
# def add_favorite(
#     favorite: FavoriteCreate,
#     current_user = Depends(get_current_user)
# ):

#     db: Session = SessionLocal()

#     user = db.query(User).filter(
#         User.email == current_user["sub"]
#     ).first()

#     existing = db.query(Favorite).filter(
#         Favorite.movie_id == favorite.movie_id,
#         Favorite.user_id == user.id
#     ).first()

#     if existing:
#         raise HTTPException(
#             status_code=400,
#             detail="Movie already in favorites"
#         )

#     new_favorite = Favorite(
#         movie_id=favorite.movie_id,
#         title=favorite.title,
#         poster=favorite.poster,
#         user_id=user.id
#     )

#     db.add(new_favorite)
#     db.commit()

#     return {"message": "Favorite added"}

# # View favorites
# @router.get("/favorites")
# def get_favorites(
#     current_user = Depends(get_current_user)
# ):

#     db: Session = SessionLocal()

#     user = db.query(User).filter(
#         User.email == current_user["sub"]
#     ).first()

#     favorites = db.query(Favorite).filter(
#         Favorite.user_id == user.id
#     ).all()

#     return favorites

# # Delete favorite
# @router.delete("/favorites/{movie_id}")
# def delete_favorite(
#     movie_id: str,
#     current_user = Depends(get_current_user)
# ):

#     db: Session = SessionLocal()

#     user = db.query(User).filter(
#         User.email == current_user["sub"]
#     ).first()

#     favorite = db.query(Favorite).filter(
#         Favorite.movie_id == movie_id,
#         Favorite.user_id == user.id
#     ).first()

#     if not favorite:
#         raise HTTPException(
#             status_code=404,
#             detail="Favorite not found"
#         )

#     db.delete(favorite)
#     db.commit()

#     return {"message": "Favorite removed"}


from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal

from app.schemas.favorite_schema import (
    FavoriteCreate,
    FavoriteResponse
)

from app.utils.auth_dependency import get_current_user

from app.database.crud import (
    get_user_by_email,
    get_user_favorites,
    get_favorite_by_movie,
    create_favorite,
    remove_favorite
)

router = APIRouter()


# Add favorite
@router.post("/favorites")
def add_favorite(
    favorite: FavoriteCreate,
    current_user = Depends(get_current_user)
):

    db: Session = SessionLocal()

    user = get_user_by_email(
        db,
        current_user["sub"]
    )

    existing = get_favorite_by_movie(
        db,
        favorite.movie_id,
        user.id
    )

    if existing:

        raise HTTPException(
            status_code=400,
            detail="Movie already in favorites"
        )

    create_favorite(
        db,
        favorite.movie_id,
        favorite.title,
        favorite.poster,
        user.id
    )

    return {
        "success": True,
        "message": "Favorite added successfully"
    }


# View favorites
@router.get(
    "/favorites",
    response_model=list[FavoriteResponse]
)
def get_favorites(
    current_user = Depends(get_current_user)
):

    db: Session = SessionLocal()

    user = get_user_by_email(
        db,
        current_user["sub"]
    )

    favorites = get_user_favorites(
        db,
        user.id
    )

    return favorites


# Delete favorite
@router.delete("/favorites/{movie_id}")
def delete_favorite(
    movie_id: str,
    current_user = Depends(get_current_user)
):

    db: Session = SessionLocal()

    user = get_user_by_email(
        db,
        current_user["sub"]
    )

    favorite = get_favorite_by_movie(
        db,
        movie_id,
        user.id
    )

    if not favorite:

        raise HTTPException(
            status_code=404,
            detail="Favorite not found"
        )

    remove_favorite(
        db,
        favorite
    )

    return {
        "success": True,
        "message": "Favorite removed successfully"
    }