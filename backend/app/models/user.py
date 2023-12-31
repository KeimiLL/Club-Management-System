"""File for User model."""


from app.db.base_class import Base
from app.models.coach import Coach
from app.models.meeting import Meeting
from app.models.meeting_user import MeetingUser
from app.models.player import Player
from app.schemas.enums import Roles
from sqlalchemy import Integer, String
from sqlalchemy.ext.associationproxy import AssociationProxy, association_proxy
from sqlalchemy.orm import Mapped, mapped_column, relationship


class User(Base):
    """User model class.

    Args:
        Base (Base): Base class for models.
    """

    __tablename__ = "users"

    def __repr__(self):
        return (
            f"User(id={self.id}, full_name={self.full_name}, "
            f"email={self.email}, hashed_password={self.hashed_password}, "
            f"role={self.role})"
        )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    full_name: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False, index=True)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)
    role: Mapped[Roles] = mapped_column(String, nullable=False)

    coach: Mapped["Coach"] = relationship(back_populates="user")
    player: Mapped["Player"] = relationship(back_populates="user")
    created_meetings: Mapped[list["Meeting"]] = relationship(
        back_populates="created_by_user"
    )

    meeting_association: Mapped[list["MeetingUser"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )
    meetings: AssociationProxy[list["Meeting"]] = association_proxy(
        "meeting_association", "meeting"
    )
