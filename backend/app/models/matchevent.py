"""File for MatchEvent model."""


from app.db.base_class import Base
from app.schemas.enums import EventType
from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column


class MatchEvent(Base):
    """MatchEvent model class.

    Args:
        Base (Base): Base class for models.
    """

    __tablename__ = "matchevents"

    def __repr__(self):
        return (
            f"MatchEvent(id={self.id}, match_id={self.match_id}, "
            f"minute={self.minute}, type={self.event_type}, "
            f"desc={self.description})"
        )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    match_id: Mapped[int] = mapped_column(Integer, ForeignKey("matches.id"))
    minute: Mapped[int] = mapped_column(Integer, nullable=False)
    event_type: Mapped[EventType] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
