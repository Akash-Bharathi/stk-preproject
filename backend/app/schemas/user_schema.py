from pydantic import (
    BaseModel,
    EmailStr,
    Field
)


# Register Schema
class UserRegister(BaseModel):

    email: EmailStr

    password: str = Field(
        min_length=6,
        max_length=50
    )


# Login Schema
class UserLogin(BaseModel):

    email: EmailStr

    password: str = Field(
        min_length=6,
        max_length=50
    )