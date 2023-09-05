"""File for Team schemas."""


from typing import TYPE_CHECKING

from pydantic import BaseModel, ConfigDict, Field

if TYPE_CHECKING:
    from app.schemas.coach import Coach
    from app.schemas.match import Match
    from app.schemas.player import Player
    from app.schemas.training import Training


class TeamBase(BaseModel):
    """Base Team schema."""

    name: str | None = None


class TeamCreate(TeamBase):
    """Team schema for creation."""

    coach_id: int = Field(..., ge=1)
    name: str


class Team(TeamBase):
    """Team schema for returning data from DB."""

    name: str
    coach: "Coach"
    players: list["Player"]
    matches: list["Match"]
    trainings: list["Training"]


class TeamUpdate(TeamBase):
    """Team schema for updating."""


class TeamInDBBase(TeamBase):
    """Base Team schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: int | None = None
    coach_id: int | None = None
    coach: "Coach"
    players: list["Player"]
    matches: list["Match"]
    trainings: list["Training"]
