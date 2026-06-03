from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal

from app.utils.auth_dependency import (
    get_current_user
)

from app.services.dashboard_service import (
    get_dashboard_stats
)

router = APIRouter()


def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()


@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    stats = get_dashboard_stats(
        db,
        current_user
    )

    if not stats:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return stats