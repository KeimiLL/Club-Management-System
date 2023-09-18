"""File for TrainingPlayer schemas."""


from typing import TYPE_CHECKING

from app.schemas.enums import TrainingPresence
from app.schemas.misc import DBIndexInt
from pydantic import BaseModel, ConfigDict

if TYPE_CHECKING:
    from app.schemas.player import Player
    from app.schemas.training import Training


class TrainingPlayerBase(BaseModel):
    """Base TrainingPlayer schema."""

    presence: TrainingPresence | None = None


class TrainingPlayerCreate(TrainingPlayerBase):
    """TrainingPlayer schema for creation."""

    training_id: DBIndexInt
    player_id: DBIndexInt
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

    id: DBIndexInt | None = None
    training_id: DBIndexInt | None = None
    player_id: DBIndexInt | None = None
    training: "Training"
    player: "Player"
