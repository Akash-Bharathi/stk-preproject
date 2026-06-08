from sqlalchemy.orm import Session

from app.models.search_history import SearchHistory
from app.models.user import User


# SAVE SEARCH
def save_search_history(
    db: Session,
    keyword: str,
    current_user
):

    # Ignore tiny searches
    if len(keyword.strip()) < 3:
        return None

    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    if not user:
        return None

    # Get latest search
    last_search = db.query(SearchHistory).filter(
        SearchHistory.user_id == user.id
    ).order_by(
        SearchHistory.searched_at.desc()
    ).first()

    # Prevent duplicate consecutive searches
    if (
        last_search and
        last_search.keyword.lower() == keyword.lower()
    ):
        return last_search

    history = SearchHistory(
        keyword=keyword,
        user_id=user.id
    )

    db.add(history)
    db.commit()

    db.refresh(history)

    return history

# GET USER HISTORY
def get_user_history(
    db: Session,
    current_user
):

    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    if not user:
        return []

    print("USER FOUND:", user)
    print("EMAIL:", current_user["sub"])

    history = db.query(SearchHistory).filter(
        SearchHistory.user_id == user.id
    ).order_by(
        SearchHistory.searched_at.desc()
    ).limit(10).all()

    return history
