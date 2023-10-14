"""File for Coach schemas."""


import datetime
from typing import TYPE_CHECKING

from pydantic import BaseModel, ConfigDict, Field

if TYPE_CHECKING:
    from app.schemas.team import Team
    from app.schemas.user import User


class CoachBase(BaseModel):
    """Base Coach schema."""

    date_of_joining: datetime.date | None = None
    date_of_birth: datetime.date | None = None


class CoachCreate(CoachBase):
    """Coach schema for creation."""

    user_id: int = Field(..., ge=1, le=10**7)
    date_of_joining: datetime.date
    date_of_birth: datetime.date


class Coach(CoachBase):
    """Coach schema for returning data from DB."""

    date_of_joining: datetime.date
    date_of_birth: datetime.date
    user: "User"
    teams: list["Team"]


class CoachUpdate(CoachBase):
    """Coach schema for updating."""


class CoachInDBBase(CoachBase):
    """Base Coach schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    user_id: int | None = Field(None, ge=1, le=10**7)
    user: "User"
    teams: list["Team"]


class CoachOnlyBaseInfo(BaseModel):
    """Coach schema for returning data from the database."""

    user_id: int = Field(..., ge=1, le=10**7)
    user_full_name: str = Field(..., min_length=4)
