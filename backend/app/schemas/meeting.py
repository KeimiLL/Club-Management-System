"""File for Meeting schemas."""


import datetime
from typing import TYPE_CHECKING

from pydantic import BaseModel, ConfigDict, Field

if TYPE_CHECKING:
    from app.schemas.user import User


class MeetingBase(BaseModel):
    """Base Meeting schema."""

    notes: str | None = None
    description: str | None = None
    date: datetime.date | None = None


class MeetingCreate(MeetingBase):
    """Meeting schema for creation."""

    user_id: int = Field(..., ge=1)
    description: str
    date: datetime.date


class Meeting(MeetingBase):
    """Meeting schema for returning data from DB."""

    description: str
    date: datetime.date
    created_by_user: "User"
    users: list["User"]


class MeetingUpdate(MeetingBase):
    """Meeting schema for updating."""


class MeetingInDBBase(MeetingBase):
    """Base Meeting schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: int | None = None
    user_id: int | None = None
    created_by_user: "User"
    users: list["User"]
