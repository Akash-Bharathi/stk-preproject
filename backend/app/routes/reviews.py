from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database.connection import SessionLocal

from app.schemas.review_schema import (
    ReviewCreate,
    ReviewUpdate,
    ReviewResponse
)

from app.services.review_service import (
    create_review,
    get_reviews_by_movie,
    update_review,
    delete_review
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


# ADD REVIEW
@router.post(
    "/reviews",
    response_model=ReviewResponse,
    status_code=201
)
def add_review(
    review: ReviewCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return create_review(
        db,
        review,
        current_user
    )


# GET REVIEWS BY MOVIE
@router.get(
    "/reviews/{movie_id}",
    response_model=List[ReviewResponse]
)
def get_reviews(
    movie_id: str,
    page: int = 1,
    limit: int = 5,
    db: Session = Depends(get_db)
):

    return get_reviews_by_movie(
        db,
        movie_id,
        page,
        limit
    )


# UPDATE REVIEW
@router.put(
    "/reviews/{review_id}",
    response_model=ReviewResponse
)
def edit_review(
    review_id: int,
    review: ReviewUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return update_review(
        db,
        review_id,
        review,
        current_user
    )


# DELETE REVIEW
@router.delete(
    "/reviews/{review_id}"
)
def remove_review(
    review_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return delete_review(
        db,
        review_id,
        current_user
    )