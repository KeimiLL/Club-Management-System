"""File for User model."""


from app.db.base_class import Base
from sqlalchemy import Boolean, Integer, String
from sqlalchemy.orm import Mapped, mapped_column


class User(Base):
    """Class for User model.

    Args:
        Base (Base): Base class for models
    """

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False, index=True)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)
    role: Mapped[str] = mapped_column(Boolean(), default=True)
