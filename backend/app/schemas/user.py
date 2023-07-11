"""File for User schemas."""


from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr

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


class User(UserInDBBase):
    """User schema for returning data from DB."""


class UserInDB(UserInDBBase):
    """User schema for storing in DB."""

    hashed_password: str
