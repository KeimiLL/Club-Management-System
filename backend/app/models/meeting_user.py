"""File for MeetingUser association model."""


from typing import TYPE_CHECKING

from app.db.base_class import Base
from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from app.models.meeting import Meeting
    from app.models.user import User


class MeetingUser(Base):
    """MeetingUser model class.

    Args:
        Base (Base): Base class for models.
    """

    __tablename__ = "meetings_users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    meeting_id: Mapped[int] = mapped_column(Integer, ForeignKey("meetings.id"))
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))

    meeting: Mapped["Meeting"] = relationship(back_populates="user_association")
    user: Mapped["User"] = relationship(back_populates="meeting_association")
