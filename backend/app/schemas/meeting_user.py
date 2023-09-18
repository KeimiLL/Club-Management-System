"""File for MeetingUser schemas."""


from typing import TYPE_CHECKING

from app.schemas.misc import DBIndexInt, NonEmptyUniqueDBIndexIntSet
from pydantic import BaseModel, ConfigDict

if TYPE_CHECKING:
    from app.schemas.meeting import Meeting, MeetingCreateNoUserId
    from app.schemas.user import User


class MeetingUserBase(BaseModel):
    """Base MeetingUser schema."""


class MeetingUserCreate(MeetingUserBase):
    """MeetingUser schema for creation."""

    meeting_id: DBIndexInt
    user_id: DBIndexInt


class MeetingUserCreateUserIdList(MeetingUserBase):
    """MeetingUser schema for creation with a set of users ids."""

    meeting: "MeetingCreateNoUserId"
    user_ids: NonEmptyUniqueDBIndexIntSet


class MeetingUser(MeetingUserBase):
    """MeetingUser schema for returning data from DB."""

    meeting: "Meeting"
    user: "User"


class MeetingUserUpdate(MeetingUserBase):
    """MeetingUser schema for updating."""


class MeetingUserInDBBase(MeetingUserBase):
    """Base MeetingUser schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: DBIndexInt | None = None
    meeting_id: DBIndexInt | None = None
    user_id: DBIndexInt | None = None
    meeting: "Meeting"
    user: "User"
