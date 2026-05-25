from pydantic import BaseModel


# Request schema
class FavoriteCreate(BaseModel):

    movie_id: str
    title: str
    poster: str


# Response schema
class FavoriteResponse(BaseModel):

    id: int
    movie_id: str
    title: str
    poster: str
    user_id: int

    class Config:
        from_attributes = True