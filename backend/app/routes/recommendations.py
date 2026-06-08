from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal

from app.utils.auth_dependency import (
    get_current_user
)

from app.services.recommendation_service import (
    get_recommendations
)

router = APIRouter()


def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()


@router.get("/recommendations")
def recommendations(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return get_recommendations(
        db,
        current_user
    )