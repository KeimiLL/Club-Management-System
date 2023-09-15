"""File for Match schemas."""


import datetime
from typing import TYPE_CHECKING

from app.schemas.misc import DBIndexInt
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


class MatchCreate(MatchBase):
    """Match schema for creation."""

    team_id: DBIndexInt
    opponent: str = Field(..., min_length=3)
    is_home: bool = True
    goals_scored: NonNegativeInt
    goals_conceded: NonNegativeInt
    notes: str
    date: datetime.date


class Match(MatchBase):
    """Match schema for returning data from DB."""

    opponent: str = Field(..., min_length=3)
    is_home: bool
    goals_scored: NonNegativeInt
    goals_conceded: NonNegativeInt
    notes: str
    date: datetime.date
    team: "Team"
    players: list["Player"]


class MatchUpdate(MatchBase):
    """Match schema for updating."""


class MatchInDBBase(MatchBase):
    """Base Match schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: DBIndexInt | None = None
    team_id: DBIndexInt | None = None
    team: "Team"
    players: list["Player"]
