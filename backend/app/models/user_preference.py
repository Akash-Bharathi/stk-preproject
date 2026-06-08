from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.connection import Base


class UserPreference(Base):

    __tablename__ = "user_preferences"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    genre = Column(
        String,
        nullable=False
    )

    score = Column(
        Integer,
        nullable=False,
        default=1
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    user = relationship(
        "User",
        back_populates="preferences"
    )
