from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.review import Review
from app.models.user import User


# ADD REVIEW
def create_review(
    db: Session,
    review_data,
    current_user
):

    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    existing_review = db.query(Review).filter(
        Review.movie_id == review_data.movie_id,
        Review.user_id == user.id
    ).first()

    if existing_review:

        raise HTTPException(
            status_code=400,
            detail="You already reviewed this movie"
        )

    new_review = Review(
        movie_id=review_data.movie_id,
        review=review_data.review,
        rating=review_data.rating,
        user_id=user.id
    )

    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    return new_review


# GET REVIEWS
def get_reviews_by_movie(
    db: Session,
    movie_id: str,
    page: int = 1,
    limit: int = 5
):

    offset = (page - 1) * limit

    reviews = db.query(Review).filter(
        Review.movie_id == movie_id
    ).offset(offset).limit(limit).all()

    return reviews


# UPDATE REVIEW
def update_review(
    db: Session,
    review_id: int,
    review_data,
    current_user
):

    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    review = db.query(Review).filter(
        Review.id == review_id
    ).first()

    if not review:

        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    if review.user_id != user.id:

        raise HTTPException(
            status_code=403,
            detail="Not allowed to edit this review"
        )

    if review_data.review is not None:

        review.review = review_data.review

    if review_data.rating is not None:

        review.rating = review_data.rating

    db.commit()
    db.refresh(review)

    return review


# DELETE REVIEW
def delete_review(
    db: Session,
    review_id: int,
    current_user
):

    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    review = db.query(Review).filter(
        Review.id == review_id
    ).first()

    if not review:

        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    if review.user_id != user.id:

        raise HTTPException(
            status_code=403,
            detail="Not allowed to delete this review"
        )

    db.delete(review)
    db.commit()

    return {
        "message": "Review deleted successfully"
    }