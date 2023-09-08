"""File for MatchPlayer association model."""


from typing import TYPE_CHECKING

from app.db.base_class import Base
from app.schemas.enums import TrainingPresence
from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from app.models.player import Player
    from app.models.training import Training


class TrainingPlayer(Base):
    """TrainingPlayer model class.

    Args:
        Base (Base): Base class for models.
    """

    __tablename__ = "trainings_players"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    training_id: Mapped[int] = mapped_column(Integer, ForeignKey("trainings.id"))
    player_id: Mapped[int] = mapped_column(Integer, ForeignKey("players.user_id"))
    presence: Mapped[TrainingPresence] = mapped_column(String, nullable=False)

    training: Mapped["Training"] = relationship(back_populates="player_association")
    player: Mapped["Player"] = relationship(back_populates="training_association")
