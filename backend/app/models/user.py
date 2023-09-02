"""File for User model."""


from app.db.base_class import Base
from app.models.coach import Coach
from app.models.player import Player
from app.schemas.enums import Roles
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship


class User(Base):
    """User model class.

    Args:
        Base (Base): Base class for models.
    """

    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    full_name: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False, index=True)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)
    role: Mapped[Roles] = mapped_column(String, nullable=False)
    coach: Mapped["Coach"] = relationship(back_populates="user")
    player: Mapped["Player"] = relationship(back_populates="user")
