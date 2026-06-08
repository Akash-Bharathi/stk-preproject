from sqlalchemy.orm import Session

from app.models.user import User
from app.models.favorite import Favorite

from app.models.viewed_movie import ViewedMovie


def get_user_by_email(
    db: Session,
    email: str
):

    return db.query(User).filter(
        User.email == email
    ).first()


def get_user_favorites(
    db: Session,
    user_id: int
):

    return db.query(Favorite).filter(
        Favorite.user_id == user_id
    ).all()


def get_favorite_by_movie(
    db: Session,
    movie_id: str,
    user_id: int
):

    return db.query(Favorite).filter(
        Favorite.movie_id == movie_id,
        Favorite.user_id == user_id
    ).first()


def create_favorite(
    db: Session,
    movie_id: str,
    title: str,
    poster: str,
    genre: str,
    user_id: int
):

    new_favorite = Favorite(
        movie_id=movie_id,
        title=title,
        poster=poster,
        genre=genre,
        user_id=user_id
    )

    db.add(new_favorite)

    db.commit()

    db.refresh(new_favorite)

    return new_favorite


def remove_favorite(
    db: Session,
    favorite: Favorite
):

    db.delete(favorite)

    db.commit()


def create_user(
    db: Session,
    email: str,
    password: str
):

    new_user = User(
        email=email,
        password=password
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return new_user


def save_viewed_movie(
    db: Session,
    movie_id: str,
    title: str,
    genre: str,
    user_id: int
):

    viewed = ViewedMovie(
        movie_id=movie_id,
        title=title,
        genre=genre,
        user_id=user_id
    )

    db.add(viewed)

    db.commit()

    db.refresh(viewed)

    return viewed


def get_user_viewed_movies(
    db: Session,
    user_id: int
):

    return db.query(ViewedMovie).filter(
        ViewedMovie.user_id == user_id
    ).all()
