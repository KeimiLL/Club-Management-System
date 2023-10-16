"""File for MatchPlayer association model."""


from typing import TYPE_CHECKING

from app.db.base_class import Base
from sqlalchemy import Boolean, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from app.models.match import Match
    from app.models.player import Player


class MatchPlayer(Base):
    """MatchPlayer model class.

    Args:
        Base (Base): Base class for models.
    """

    __tablename__ = "matches_players"

    def __repr__(self):
        return (
            f"MatchPlayer(id={self.id}, match_id={self.match_id}, "
            f"player_id={self.player_id}, is_starter={self.is_starter}, "
            f"mins_pl={self.minutes_played}, rating={self.rating})"
        )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    match_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("matches.id", ondelete="CASCADE")
    )
    player_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("players.user_id", ondelete="CASCADE")
    )
    is_starter: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    minutes_played: Mapped[int] = mapped_column(Integer, nullable=False)
    rating: Mapped[int] = mapped_column(Integer, nullable=False)

    match: Mapped["Match"] = relationship(back_populates="player_association")
    player: Mapped["Player"] = relationship(back_populates="match_association")
