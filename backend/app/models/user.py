from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database.connection import Base


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    email = Column(
        String,
        unique=True,
        nullable=False
    )

    password = Column(
        String,
        nullable=False
    )

    favorites = relationship(
        "Favorite",
        back_populates="user",
        cascade="all, delete"
    )

    reviews = relationship(
        "Review",
        back_populates="user",
        cascade="all, delete"
    )

    search_history = relationship(
        "SearchHistory",
        back_populates="user",
        cascade="all, delete"
    )
