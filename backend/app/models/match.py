"""File for Match model."""


import datetime

from app.db.base_class import Base
from app.models.match_player import MatchPlayer
from app.models.player import Player
from app.models.team import Team
from sqlalchemy import Boolean, Date, ForeignKey, Integer, String
from sqlalchemy.ext.associationproxy import AssociationProxy, association_proxy
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Match(Base):
    """Match model class.

    Args:
        Base (Base): Base class for models.
    """

    __tablename__ = "matches"

    def __repr__(self):
        return (
            f"Match(id={self.id}, team_id={self.team_id}, "
            f"opponent={self.opponent}, is_home={self.is_home}, "
            f"gs={self.goals_scored}, gc={self.goals_conceded}, "
            f"notes={self.notes}, date={self.date})"
        )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    team_id: Mapped[int] = mapped_column(Integer, ForeignKey("teams.id"))
    opponent: Mapped[str] = mapped_column(String, nullable=False)
    is_home: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    goals_scored: Mapped[int] = mapped_column(Integer, nullable=False)
    goals_conceded: Mapped[int] = mapped_column(Integer, nullable=False)
    notes: Mapped[str] = mapped_column(String, nullable=False)
    date: Mapped[datetime.date] = mapped_column(Date, nullable=False)

    team: Mapped["Team"] = relationship(back_populates="matches")

    player_association: Mapped[list["MatchPlayer"]] = relationship(
        back_populates="match", cascade="all, delete-orphan"
    )
    players: AssociationProxy[list["Player"]] = association_proxy(
        "player_association", "player"
    )
