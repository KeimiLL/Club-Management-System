"""File for Meeting model."""


import datetime
from typing import TYPE_CHECKING

from app.db.base_class import Base
from app.models.meeting_user import MeetingUser
from sqlalchemy import Date, ForeignKey, Integer, String
from sqlalchemy.ext.associationproxy import AssociationProxy, association_proxy
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from app.models.user import User


class Meeting(Base):
    """Meeting model class.

    Args:
        Base (Base): Base class for models.
    """

    __tablename__ = "meetings"

    def __repr__(self):
        return (
            f"Meeting(id={self.id}, user_id={self.user_id}, desc={self.name}, "
            f"notes={self.notes}, date={self.date})"
        )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    name: Mapped[str] = mapped_column(String, nullable=False)
    notes: Mapped[str | None] = mapped_column(String, nullable=True)
    date: Mapped[datetime.date] = mapped_column(Date, nullable=False)

    created_by_user: Mapped["User"] = relationship(back_populates="created_meetings")

    user_association: Mapped[list["MeetingUser"]] = relationship(
        back_populates="meeting", cascade="all, delete-orphan"
    )
    users: AssociationProxy[list["User"]] = association_proxy(
        "user_association", "user", creator=lambda user: MeetingUser(user=user)
    )
