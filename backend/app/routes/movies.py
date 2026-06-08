from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal

from app.services.omdb_service import (
    search_movies,
    get_movie
)

from app.services.history_service import (
    save_search_history
)

from app.utils.auth_dependency import (
    get_current_user
)


router = APIRouter()


# DATABASE SESSION
def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()


# SEARCH MOVIES
@router.get("/movies/search")
def search(
    title: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    # SAVE SEARCH HISTORY
    save_search_history(
        db,
        title,
        current_user
    )

    return search_movies(title)


@router.get("/movies/{imdb_id}")
def movie_details(
    imdb_id: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    movie = get_movie(imdb_id)

    from app.models.user import User
    from app.database.crud import save_viewed_movie

    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    if user and movie:

        save_viewed_movie(
        db,
        imdb_id,
        movie.get("Title", "Unknown"),
        movie.get("Genre", ""),
        user.id
    )

    return movie