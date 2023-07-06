"""File for User schemas."""


from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr


class UserBase(BaseModel):
    """Base User schema."""

    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    role: Optional[str] = None


class UserCreate(UserBase):
    """User schema for creation."""

    full_name: str
    email: EmailStr
    password: str


class UserUpdate(UserBase):
    """User schema for updating."""

    password: Optional[str] = None


class UserInDBBase(UserBase):
    """Base User schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: Optional[int] = None


class User(UserInDBBase):
    """User schema for returning."""


class UserInDB(UserInDBBase):
    """User schema for storing in DB."""

    hashed_password: str
