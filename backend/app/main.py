from fastapi import FastAPI
from app.database.connection import engine, Base, SessionLocal
from app.routes import auth, movies, favorites
from fastapi.middleware.cors import CORSMiddleware
from app.models.user import User
from app.models.favorite import Favorite
from app.models.user_preference import UserPreference
from app.utils.hashing import hash_password
from sqlalchemy.orm import Session
from app.models.review import Review
from app.models.search_history import SearchHistory
from app.models.viewed_movie import ViewedMovie
from app.routes.recommendations import router as recommendation_router
from app.routes.reviews import router as review_router
from app.routes.history import router as history_router
from app.routes.dashboard import router as dashboard_router
Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.on_event("startup")
def create_default_user():
    db: Session = SessionLocal()
    existing_user = db.query(User).filter(User.email == "test@gmail.com").first()
    if not existing_user:
        db.add(User(email="test@gmail.com", password=hash_password("12345678")))
        db.commit()
    db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth.router)
app.include_router(movies.router)
app.include_router(favorites.router)
app.include_router(review_router)
app.include_router(history_router)
app.include_router(recommendation_router)
app.include_router(dashboard_router)


@app.get("/")
def home():
    return {
        "message": "Movie Recommendation Backend Running",
        "docs": "/docs",
        "status": "success"
    }