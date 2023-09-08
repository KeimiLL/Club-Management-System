"""File for MeetingUser schemas."""


from typing import TYPE_CHECKING

from pydantic import BaseModel, ConfigDict, Field

if TYPE_CHECKING:
    from app.schemas.meeting import Meeting
    from app.schemas.user import User


class MeetingUserBase(BaseModel):
    """Base MeetingUser schema."""


class MeetingUserCreate(MeetingUserBase):
    """MeetingUser schema for creation."""

    meeting_id: int = Field(..., ge=1)
    user_id: int = Field(..., ge=1)


class MeetingUser(MeetingUserBase):
    """MeetingUser schema for returning data from DB."""

    meeting: "Meeting"
    user: "User"


class MeetingUserUpdate(MeetingUserBase):
    """MeetingUser schema for updating."""


class MeetingUserInDBBase(MeetingUserBase):
    """Base MeetingUser schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: int | None = None
    meeting_id: int | None = None
    user_id: int | None = None
    meeting: "Meeting"
    user: "User"
