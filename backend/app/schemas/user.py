"""File for User schemas."""


from typing import Optional

from app.schemas.enums import Roles
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class UserBase(BaseModel):
    """Base User schema."""

    full_name: Optional[str] = Field(None, min_length=4)
    email: Optional[EmailStr] = None


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

    role: Roles


class UserUpdate(UserBase):
    """User schema for updating."""

    password: Optional[str] = None
    role: Optional[Roles] = None


class UserInDBBase(UserBase):
    """Base User schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: Optional[int] = None
    role: Optional[Roles] = None


class UserInDB(UserInDBBase):
    """User schema for storing in DB."""

    hashed_password: str
