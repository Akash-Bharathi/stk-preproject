from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship

from datetime import datetime

from app.database.connection import Base


class ViewedMovie(Base):

    __tablename__ = "viewed_movies"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    movie_id = Column(
        String,
        nullable=False
    )

    title = Column(
        String,
        nullable=False
    )


    genre = Column(
        String,
        nullable=True
    )

    viewed_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    user = relationship(
        "User",
        back_populates="viewed_movies"
    )
