from pydantic import BaseModel
from datetime import datetime


class HistoryResponse(BaseModel):

    id: int

    keyword: str

    searched_at: datetime

    user_id: int

    class Config:

        from_attributes = True