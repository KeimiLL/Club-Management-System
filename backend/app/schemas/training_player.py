"""File for TrainingPlayer schemas."""


from typing import TYPE_CHECKING

from app.schemas.enums import TrainingPresence
from pydantic import BaseModel, ConfigDict, Field

if TYPE_CHECKING:
    from app.models.player import Player
    from app.models.training import Training


class TrainingPlayerBase(BaseModel):
    """Base TrainingPlayer schema."""

    presence: TrainingPresence | None = None


class TrainingPlayerCreate(TrainingPlayerBase):
    """TrainingPlayer schema for creation."""

    training_id: int = Field(..., ge=1)
    player_id: int = Field(..., ge=1)
    presence: TrainingPresence


class TrainingPlayer(TrainingPlayerBase):
    """TrainingPlayer schema for returning data from DB."""

    presence: TrainingPresence
    training: "Training"
    player: "Player"


class TrainingPlayerUpdate(TrainingPlayerBase):
    """TrainingPlayer schema for updating."""


class TrainingPlayerInDBBase(TrainingPlayerBase):
    """Base TrainingPlayer schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: int | None = None
    training_id: int | None = None
    player_id: int | None = None
    training: "Training"
    player: "Player"
