"""File for Coach model."""


import datetime
from typing import TYPE_CHECKING

from app.db.base_class import Base
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

    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("users.id"), primary_key=True
    )
    date_of_joining: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    date_of_birth: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    user: Mapped["User"] = relationship(back_populates="coach")
