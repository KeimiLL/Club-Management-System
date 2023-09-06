"""File for Meeting model."""


import datetime
from typing import TYPE_CHECKING

from app.db.base_class import Base
from sqlalchemy import Date, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from app.models.user import User


class Meeting(Base):
    """Meeting model class.

    Args:
        Base (Base): Base class for models.
    """

    __tablename__ = "meetings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    description: Mapped[str] = mapped_column(String, nullable=False)
    notes: Mapped[str] = mapped_column(String, nullable=False)
    date: Mapped[datetime.date] = mapped_column(Date, nullable=False)

    created_by_user: Mapped["User"] = relationship(back_populates="created_meetings")
