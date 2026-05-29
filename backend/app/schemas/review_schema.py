from pydantic import BaseModel, Field
from typing import Optional


class ReviewCreate(BaseModel):

    movie_id: str

    review: str = Field(
        min_length=1
    )

    rating: int = Field(
        ge=1,
        le=5
    )


class ReviewUpdate(BaseModel):

    review: Optional[str] = Field(
        default=None,
        min_length=1
    )

    rating: Optional[int] = Field(
        default=None,
        ge=1,
        le=5
    )


class ReviewResponse(BaseModel):

    id: int

    movie_id: str

    review: str

    rating: int

    user_id: int

    class Config:

        from_attributes = True