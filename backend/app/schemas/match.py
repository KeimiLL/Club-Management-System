"""File for Match schemas."""


import datetime
from typing import TYPE_CHECKING

from pydantic import BaseModel, ConfigDict, Field, NonNegativeInt

if TYPE_CHECKING:
    from app.schemas.matchevent import MatchEvent
    from app.schemas.player import Player, PlayerOnlyBaseInfo
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
    match_events: list["MatchEvent"]


class MatchUpdate(MatchCreate):
    """Match schema for updating."""


class MatchInDBBase(MatchBase):
    """Base Match schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: int | None = Field(None, ge=1, le=10**7)
    team_id: int | None = Field(None, ge=1, le=10**7)
    team: "Team"
    players: list["Player"]
    match_events: list["MatchEvent"]


class MatchScore(BaseModel):
    """Match schema for match score."""

    goals_scored: NonNegativeInt
    goals_conceded: NonNegativeInt


class MatchInProgress(BaseModel):
    """Match schema for returning a match in progress."""

    id: int = Field(..., ge=1, le=10**7)
    team_name: str = Field(..., min_length=3)
    opponent: str = Field(..., min_length=3)
    is_home: bool
    goals_scored: NonNegativeInt
    goals_conceded: NonNegativeInt
    notes: str | None = None
    date: datetime.date


class MatchTableView(BaseModel):
    """Match schema for returning data to be shown in the matches' table."""

    id: int = Field(..., ge=1, le=10**7)
    team_name: str = Field(..., min_length=3)
    opponent: str = Field(..., min_length=3)
    is_home: bool = True
    goals_scored: NonNegativeInt | None = None
    goals_conceded: NonNegativeInt | None = None
    date: datetime.date


class MatchSideView(MatchTableView):
    """Match schema for displaying data in the side panel."""

    notes: str | None = None
    has_started: bool = False
    has_ended: bool = False
    players: list["PlayerOnlyBaseInfo"]
