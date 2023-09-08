"""File for Training schemas."""


import datetime

from app.models.player import Player
from app.schemas.team import Team
from pydantic import BaseModel, ConfigDict, Field


class TrainingBase(BaseModel):
    """Base Training schema."""

    notes: str | None = None
    date: datetime.date | None = None


class TrainingCreate(TrainingBase):
    """Training schema for creation."""

    team_id: int = Field(..., ge=1)
    notes: str
    date: datetime.date


class Training(TrainingBase):
    """Training schema for returning data from DB."""

    notes: str
    date: datetime.date
    team: "Team"
    players: list["Player"]


class TrainingUpdate(TrainingBase):
    """Training schema for updating."""


class TrainingInDBBase(TrainingBase):
    """Base Training schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: int | None = None
    team_id: int | None = None
    team: "Team"
    players: list["Player"]
