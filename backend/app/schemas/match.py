"""File for Match schemas."""


import datetime
from typing import TYPE_CHECKING

from pydantic import BaseModel, ConfigDict, Field, NonNegativeInt

if TYPE_CHECKING:
    from app.schemas.player import Player
    from app.schemas.team import Team


class MatchBase(BaseModel):
    """Base Match schema."""

    opponent: str | None = Field(None, min_length=3)
    is_home: bool | None = None
    goals_scored: NonNegativeInt | None = None
    goals_conceded: NonNegativeInt | None = None
    notes: str | None = None
    date: datetime.date | None = None
    has_started: bool | None = None
    has_ended: bool | None = None


class MatchCreate(BaseModel):
    """Match schema for creation."""

    team_id: int = Field(..., ge=1, le=10**7)
    opponent: str = Field(..., min_length=3)
    is_home: bool = True
    notes: str | None = None
    date: datetime.date


class Match(MatchBase):
    """Match schema for returning data from DB."""

    opponent: str = Field(..., min_length=3)
    is_home: bool
    date: datetime.date
    has_started: bool = False
    has_ended: bool = False
    team: "Team"
    players: list["Player"]


class MatchUpdate(MatchBase):
    """Match schema for updating."""


class MatchInDBBase(MatchBase):
    """Base Match schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: int | None = Field(None, ge=1, le=10**7)
    team_id: int | None = Field(None, ge=1, le=10**7)
    team: "Team"
    players: list["Player"]
