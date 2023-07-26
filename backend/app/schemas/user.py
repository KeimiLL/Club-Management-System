"""File for User schemas."""


from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr, field_validator

from app.schemas.enums import Roles


class UserBase(BaseModel):
    """Base User schema."""

    full_name: Optional[str] = None
    email: Optional[EmailStr] = None


class UserCreate(UserBase):
    """User schema for creation."""

    full_name: str
    email: EmailStr
    password: str

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


class UserCreateWithRole(UserCreate):
    """User schema for creation with a role."""

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


class User(UserBase):
    """User schema for returning data from DB."""

    role: Roles


class UserInDB(UserInDBBase):
    """User schema for storing in DB."""

    hashed_password: str
