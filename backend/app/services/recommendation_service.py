from collections import Counter
from typing import Optional

from sqlalchemy.orm import Session

from app.models.user import User
from app.models.favorite import Favorite
from app.models.search_history import SearchHistory
from app.models.user_preference import UserPreference
from app.models.viewed_movie import ViewedMovie
from app.services.omdb_service import get_movie, search_movies


def _build_movie_card(
    imdb_id: str,
    title: str = "",
    poster: Optional[str] = None,
    genre: Optional[str] = None,
    reason: str = ""
):
    movie = {
        "imdbID": imdb_id,
        "Title": title,
        "Year": "",
        "Poster": poster or "https://via.placeholder.com/300x450",
        "Genre": genre or "",
        "reason": reason,
    }

    details = get_movie(imdb_id)
    if details:
        movie["Title"] = movie["Title"] or details.get("Title", "")
        movie["Year"] = details.get("Year", "")
        movie["Poster"] = details.get("Poster", movie["Poster"])
        movie["Genre"] = movie["Genre"] or details.get("Genre", "")

    return movie


def _extract_genres(text: Optional[str]) -> list[str]:
    if not text:
        return []

    return [genre.strip() for genre in text.split(",") if genre.strip()]


def _preferred_genres(favorites: list[Favorite], viewed: list[ViewedMovie]) -> Counter:
    counts = Counter()
    for favorite in favorites:
        counts.update(_extract_genres(favorite.genre))
    for viewed_movie in viewed:
        counts.update(_extract_genres(viewed_movie.genre))
    return counts


def _persist_preferences(db: Session, user: User, genre_counts: Counter):
    existing_prefs = {
        pref.genre: pref
        for pref in db.query(UserPreference).filter(
            UserPreference.user_id == user.id
        ).all()
    }

    for genre, score in genre_counts.items():
        if genre in existing_prefs:
            existing_prefs[genre].score = score
        else:
            db.add(
                UserPreference(
                    user_id=user.id,
                    genre=genre,
                    score=score,
                )
            )

    db.commit()


def _add_search_recommendations(recommendations: list[dict], searches: list[SearchHistory], seen_ids: set[str]):
    for search in searches:
        if not search.keyword:
            continue

        result = search_movies(search.keyword)
        if result and result.get("Search"):
            for item in result["Search"][:3]:
                imdb_id = item.get("imdbID")
                if not imdb_id or imdb_id in seen_ids:
                    continue
                card = _build_movie_card(
                    imdb_id,
                    title=item.get("Title", search.keyword),
                    poster=item.get("Poster", "https://via.placeholder.com/300x450"),
                    genre="",
                    reason="Based on your recent searches"
                )
                if imdb_id not in seen_ids:
                    seen_ids.add(imdb_id)
                    recommendations.append(card)
                    break
        else:
            # Fallback to search keyword card
            if search.keyword not in seen_ids:
                recommendations.append({
                    "Title": search.keyword,
                    "Year": "",
                    "Poster": "https://via.placeholder.com/300x450",
                    "Genre": "",
                    "reason": "Based on your recent searches",
                })
    return recommendations


def _add_genre_recommendations(recommendations: list[dict], top_genres: list[str], seen_ids: set[str]):
    for genre in top_genres:
        result = search_movies(genre)
        if not result or not result.get("Search"):
            continue
        for item in result["Search"][:3]:
            imdb_id = item.get("imdbID")
            if not imdb_id or imdb_id in seen_ids:
                continue
            card = _build_movie_card(
                imdb_id,
                title=item.get("Title", genre),
                poster=item.get("Poster", "https://via.placeholder.com/300x450"),
                genre=genre,
                reason="Based on your favorite genres"
            )
            seen_ids.add(imdb_id)
            recommendations.append(card)
            break
    return recommendations


def _add_viewed_recommendations(recommendations: list[dict], viewed: list[ViewedMovie], seen_ids: set[str]):
    for viewed_movie in viewed:
        search_term = viewed_movie.title or viewed_movie.genre or ""
        if not search_term:
            continue

        result = search_movies(search_term)
        if result and result.get("Search"):
            for item in result["Search"][:3]:
                imdb_id = item.get("imdbID")
                if not imdb_id or imdb_id in seen_ids:
                    continue
                card = _build_movie_card(
                    imdb_id,
                    title=item.get("Title", viewed_movie.title),
                    poster=item.get("Poster", "https://via.placeholder.com/300x450"),
                    genre=viewed_movie.genre,
                    reason="Similar to movies you viewed"
                )
                seen_ids.add(imdb_id)
                recommendations.append(card)
                break
    return recommendations


def get_recommendations(
    db: Session,
    current_user
):

    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    if not user:
        return {
            "recommended_movies": []
        }

    recommendations = []

    favorites = db.query(Favorite).filter(
        Favorite.user_id == user.id
    ).all()

    viewed = db.query(ViewedMovie).filter(
        ViewedMovie.user_id == user.id
    ).order_by(
        ViewedMovie.viewed_at.desc()
    ).limit(5).all()

    seen_ids: set[str] = set()
    for favorite in favorites:
        seen_ids.add(favorite.movie_id)

    preferred_genre_counts = _preferred_genres(favorites, viewed)
    if preferred_genre_counts:
        _persist_preferences(db, user, preferred_genre_counts)

    top_genres = [genre for genre, _ in preferred_genre_counts.most_common(3)]
    _add_genre_recommendations(
        recommendations,
        top_genres,
        seen_ids
    )

    # Search history recommendations
    searches = db.query(SearchHistory).filter(
        SearchHistory.user_id == user.id
    ).order_by(
        SearchHistory.searched_at.desc()
    ).limit(5).all()

    _add_search_recommendations(
        recommendations,
        searches,
        seen_ids
    )

    # Viewed movie recommendations
    _add_viewed_recommendations(
        recommendations,
        viewed,
        seen_ids
    )

    # Keep at most 10 recommendations and remove duplicates
    unique = []
    seen = set()
    for movie in recommendations:
        movie_key = movie.get("imdbID") or movie.get("Title")
        if movie_key and movie_key not in seen:
            seen.add(movie_key)
            unique.append(movie)
            if len(unique) >= 10:
                break

    return {
        "recommended_movies": unique
    }
