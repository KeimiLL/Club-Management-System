"""File for Injury model."""


from app.db.base_class import Base
from app.schemas.enums import Injuries
from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column


class Injury(Base):
    """Injury model class.

    Args:
        Base (Base): Base class for models.
    """

    __tablename__ = "injuries"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    injury_type: Mapped[Injuries] = mapped_column(String, nullable=False)
    prescriptions: Mapped[str] = mapped_column(String, nullable=False)
    player_id: Mapped[int] = mapped_column(Integer, ForeignKey("players.user_id"))
