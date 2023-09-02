"""File for Player schemas."""


import datetime
from typing import TYPE_CHECKING

from pydantic import BaseModel, ConfigDict, Field

if TYPE_CHECKING:
    from app.schemas.injury import Injury
    from app.schemas.team import Team
    from app.schemas.user import User


class PlayerBase(BaseModel):
    """Base Player schema."""

    date_of_joining: datetime.date | None = None
    date_of_birth: datetime.date | None = None
    height: int | None = None
    weight: int | None = None
    notes: str | None = None
    is_injured: bool | None = None
    diet: str | None = None


class PlayerCreate(PlayerBase):
    """Player schema for creation."""

    user_id: int = Field(..., ge=1)
    team_id: int = Field(..., ge=1)
    date_of_joining: datetime.date
    date_of_birth: datetime.date
    height: int
    weight: int
    notes: str
    is_injured: bool = False


class Player(PlayerBase):
    """Player schema for returning data from DB."""

    date_of_joining: datetime.date
    date_of_birth: datetime.date
    height: int
    weight: int
    notes: str
    is_injured: bool
    user: "User"
    team: "Team"
    injuries: list["Injury"]


class PlayerUpdate(PlayerBase):
    """Player schema for updating."""


class PlayerInDBBase(PlayerBase):
    """Base Player schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    user_id: int | None = None
    team_id: int | None = None
    user: "User"
    team: "Team"
    injuries: list["Injury"]
