"""File for Coach model."""


import datetime
from typing import TYPE_CHECKING

from app.db.base_class import Base
from app.models.team import Team
from sqlalchemy import Date, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from app.models.user import User


class Coach(Base):
    """Coach model class.

    Args:
        Base (Base): Base class for models.
    """

    __tablename__ = "coaches"

    def __repr__(self):
        return f"Coach(id={self.user_id}, doj={self.date_of_joining}, dob={self.date_of_birth})"

    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("users.id"), primary_key=True
    )
    date_of_joining: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    date_of_birth: Mapped[datetime.date] = mapped_column(Date, nullable=False)

    user: Mapped["User"] = relationship(back_populates="coach")
    teams: Mapped[list["Team"]] = relationship(back_populates="coach")
