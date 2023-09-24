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

    name: str | None = Field(None, min_length=3)


class TeamCreate(TeamBase):
    """Team schema for creation."""

    coach_id: int = Field(..., ge=1, le=10**7)
    name: str = Field(..., min_length=3)


class Team(TeamBase):
    """Team schema for returning data from DB."""

    name: str = Field(..., min_length=3)
    coach: "Coach"
    players: list["Player"]
    matches: list["Match"]
    trainings: list["Training"]


class TeamUpdate(TeamBase):
    """Team schema for updating."""


class TeamInDBBase(TeamBase):
    """Base Team schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: int | None = Field(None, ge=1, le=10**7)
    coach_id: int | None = Field(None, ge=1, le=10**7)
    coach: "Coach"
    players: list["Player"]
    matches: list["Match"]
    trainings: list["Training"]
