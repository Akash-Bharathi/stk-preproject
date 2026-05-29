from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database.connection import SessionLocal

from app.schemas.history_schema import (
    HistoryResponse
)

from app.services.history_service import (
    get_user_history
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


# GET USER SEARCH HISTORY
@router.get(
    "/history",
    response_model=List[HistoryResponse]
)
def history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return get_user_history(
        db,
        current_user
    )