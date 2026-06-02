from sqlalchemy.orm import Session

from app.models.search_history import SearchHistory
from app.models.user import User


# SAVE SEARCH
def save_search_history(
    db: Session,
    keyword: str,
    current_user
):

    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    history = SearchHistory(
        keyword=keyword,
        user_id=user.id
    )

    db.add(history)
    db.commit()

    return history


# GET USER HISTORY
def get_user_history(
    db: Session,
    current_user
):

    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    print("USER FOUND:", user)
    print("EMAIL:", current_user["sub"])

    history = db.query(SearchHistory).filter(
        SearchHistory.user_id == user.id
    ).order_by(
        SearchHistory.searched_at.desc()
    ).all()

    return history