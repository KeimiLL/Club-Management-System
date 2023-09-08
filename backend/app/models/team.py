"""File for Team model."""


from typing import TYPE_CHECKING

from app.db.base_class import Base
from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from app.models.coach import Coach
    from app.models.match import Match
    from app.models.player import Player
    from app.models.training import Training


class Team(Base):
    """Team model class.

    Args:
        Base (Base): Base class for models.
    """

    __tablename__ = "teams"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    coach_id: Mapped[int] = mapped_column(Integer, ForeignKey("coaches.user_id"))
    name: Mapped[str] = mapped_column(String, nullable=False)

    coach: Mapped["Coach"] = relationship(back_populates="teams")
    players: Mapped[list["Player"]] = relationship(back_populates="team")
    matches: Mapped[list["Match"]] = relationship(back_populates="team")
    trainings: Mapped[list["Training"]] = relationship(back_populates="team")
