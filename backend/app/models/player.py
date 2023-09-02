"""File for Player model."""


import datetime
from typing import TYPE_CHECKING

from app.db.base_class import Base
from app.models.team import Team
from sqlalchemy import Boolean, Date, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from app.models.user import User


class Player(Base):
    """Player model class.

    Args:
        Base (Base): Base class for models.
    """

    __tablename__ = "players"

    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("users.id"), primary_key=True
    )
    team_id: Mapped[int] = mapped_column(Integer, ForeignKey("teams.id"))
    date_of_joining: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    date_of_birth: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    height: Mapped[int] = mapped_column(Integer, nullable=False)
    weight: Mapped[int] = mapped_column(Integer, nullable=False)
    notes: Mapped[str] = mapped_column(String, nullable=False)
    is_injured: Mapped[bool] = mapped_column(Boolean, nullable=False)
    diet: Mapped[str] = mapped_column(String, nullable=True)
    user: Mapped["User"] = relationship(back_populates="player")
    team: Mapped["Team"] = relationship(back_populates="players")
