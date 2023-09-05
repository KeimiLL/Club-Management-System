"""File for Training model."""


import datetime

from app.db.base_class import Base
from app.models.team import Team
from sqlalchemy import Date, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Training(Base):
    """Training model class.

    Args:
        Base (Base): Base class for models.
    """

    __tablename__ = "trainings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    team_id: Mapped[int] = mapped_column(Integer, ForeignKey("teams.id"))
    notes: Mapped[str] = mapped_column(String, nullable=False)
    date: Mapped[datetime.date] = mapped_column(Date, nullable=False)

    team: Mapped["Team"] = relationship(back_populates="trainings")
