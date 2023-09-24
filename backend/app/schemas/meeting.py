"""File for Meeting schemas."""


import datetime
from typing import TYPE_CHECKING

from pydantic import BaseModel, ConfigDict, Field

if TYPE_CHECKING:
    from app.schemas.user import User, UserOnlyBaseInfo


class MeetingBase(BaseModel):
    """Base Meeting schema."""

    notes: str | None = None
    name: str | None = Field(None, min_length=4)
    date: datetime.date | None = None


class MeetingCreate(MeetingBase):
    """Meeting schema for creation."""

    user_id: int = Field(..., ge=1, le=10**7)
    name: str = Field(..., min_length=4)
    date: datetime.date


class MeetingCreateNoUserId(MeetingBase):
    """Meeting schema for creation with no user id."""

    name: str = Field(..., min_length=4)
    date: datetime.date


class Meeting(MeetingCreateNoUserId):
    """Meeting schema for returning data from DB."""

    created_by_user: "User"
    users: list["User"]


class MeetingUpdate(MeetingBase):
    """Meeting schema for updating."""


class MeetingInDBBase(MeetingBase):
    """Base Meeting schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: int | None = Field(None, ge=1, le=10**7)
    user_id: int | None = Field(None, ge=1, le=10**7)
    created_by_user: "User"
    users: list["User"]


class MeetingOnlyBaseUserInfo(MeetingBase):
    """Base Meeting schema for returning filtered data from DB."""

    id: int = Field(..., ge=1, le=10**7)
    created_by_user: "UserOnlyBaseInfo"
    users: list["UserOnlyBaseInfo"]


class MeetingTableView(BaseModel):
    """Meeting schema for returning data to be shown in the meetings' table."""

    id: int = Field(..., ge=1, le=10**7)
    name: str = Field(..., min_length=4)
    date: datetime.date
    user_name: str = Field(..., min_length=4)
    is_yours: bool | None = None
