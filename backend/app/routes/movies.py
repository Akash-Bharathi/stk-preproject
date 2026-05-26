from fastapi import (
    APIRouter,
    HTTPException
)

from app.services.omdb_service import (
    search_movies,
    get_movie
)

router = APIRouter()


# Search movies
@router.get("/movies/search")
def search(title: str):

    movies = search_movies(title)

    if not movies:

        raise HTTPException(
            status_code=404,
            detail="Movies not found"
        )

    return movies


# Movie details
@router.get("/movies/{imdb_id}")
def movie_details(imdb_id: str):

    movie = get_movie(imdb_id)

    if not movie:

        raise HTTPException(
            status_code=404,
            detail="Movie not found"
        )

    return movie