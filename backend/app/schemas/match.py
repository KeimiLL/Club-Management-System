"""File for Match schemas."""


import datetime
from typing import TYPE_CHECKING

from pydantic import BaseModel, ConfigDict, Field

if TYPE_CHECKING:
    from app.schemas.team import Team


class MatchBase(BaseModel):
    """Base Match schema."""

    opponent: str | None = None
    is_home: bool | None = None
    goals_scored: int | None = None
    goals_conceded: int | None = None
    notes: str | None = None
    date: datetime.date | None = None


class MatchCreate(MatchBase):
    """Match schema for creation."""

    team_id: int = Field(..., ge=1)
    opponent: str
    is_home: bool = True
    goals_scored: int
    goals_conceded: int
    notes: str
    date: datetime.date


class Match(MatchBase):
    """Match schema for returning data from DB."""

    opponent: str
    is_home: bool
    goals_scored: int
    goals_conceded: int
    notes: str
    date: datetime.date
    team: "Team"


class MatchUpdate(MatchBase):
    """Match schema for updating."""


class MatchInDBBase(MatchBase):
    """Base Match schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: int | None = None
    team_id: int | None = None
    team: "Team"
