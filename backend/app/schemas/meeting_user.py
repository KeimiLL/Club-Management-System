"""File for MeetingUser schemas."""


from typing import TYPE_CHECKING

from app.schemas.misc import NonEmptyIntList
from pydantic import BaseModel, ConfigDict, Field, field_validator

if TYPE_CHECKING:
    from app.schemas.meeting import Meeting, MeetingCreateNoUserId
    from app.schemas.user import User


class MeetingUserBase(BaseModel):
    """Base MeetingUser schema."""


class MeetingUserCreate(MeetingUserBase):
    """MeetingUser schema for creation."""

    meeting_id: int = Field(..., ge=1)
    user_id: int = Field(..., ge=1)


class MeetingUserCreateUserIdList(MeetingUserBase):
    """MeetingUser schema for creation with a list of users ids."""

    meeting: "MeetingCreateNoUserId"
    user_ids: NonEmptyIntList

    @field_validator("user_ids")
    @classmethod
    def check_unique_user_ids(cls, user_ids: NonEmptyIntList) -> NonEmptyIntList:
        """Check if the provided user ids are unique.

        Args:
            user_ids (NonEmptyList): A list of user ids.

        Raises:
            ValueError: If there are duplicates.

        Returns:
            NonEmptyList: The provided list of user ids.
        """
        if len(user_ids) != len(set(user_ids)):
            raise ValueError("Duplicate user ids are not allowed.")
        return user_ids


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
