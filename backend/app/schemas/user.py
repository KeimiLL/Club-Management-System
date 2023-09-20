"""File for User schemas."""


from typing import TYPE_CHECKING

from app.schemas.enums import Roles
from app.schemas.misc import DBIndexInt
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

if TYPE_CHECKING:
    from app.schemas.coach import Coach
    from app.schemas.meeting import Meeting
    from app.schemas.player import Player


class UserBase(BaseModel):
    """Base User schema."""

    email: EmailStr | None = None


class UserLogin(UserBase):
    """User schema for logging in."""

    email: EmailStr
    password: str = Field(..., min_length=8)

    @field_validator("password")
    @classmethod
    def cannot_contain_null_bytes(cls, value: str) -> str:
        """Password field validator to check for NULL bytes.

        Args:
            value (str): The field value.

        Raises:
            ValueError: If the password string contains NULL bytes.

        Returns:
            str: The field value
        """
        if "\x00" in value:
            raise ValueError("The password cannot contain NULL bytes.")
        return value


class UserCreate(UserLogin):
    """User schema for creation."""

    full_name: str = Field(..., min_length=4)


class UserCreateWithRole(UserCreate):
    """User schema for creation with a role."""

    role: Roles


class User(UserBase):
    """User schema for returning data from DB."""

    full_name: str = Field(..., min_length=4)
    email: EmailStr
    role: Roles


class UserUpdate(UserBase):
    """User schema for updating."""

    full_name: str | None = Field(None, min_length=4)
    password: str | None = None
    role: Roles | None = None


class UserInDBBase(UserBase):
    """Base User schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: DBIndexInt | None = None
    full_name: str | None = Field(None, min_length=4)
    role: Roles | None = None
    coach: "Coach"
    player: "Player"
    created_meetings: list["Meeting"]


class UserInDB(UserInDBBase):
    """User schema for storing in DB."""

    hashed_password: str


class UserOnlyBaseInfo(BaseModel):
    """User schema for returning data from the database."""

    id: DBIndexInt
    full_name: str = Field(..., min_length=4)
    role: Roles
