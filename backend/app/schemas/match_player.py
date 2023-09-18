"""File for MatchPlayer schemas."""


from typing import TYPE_CHECKING

from app.schemas.misc import DBIndexInt, RatingInt
from pydantic import BaseModel, ConfigDict, NonNegativeInt

if TYPE_CHECKING:
    from app.schemas.match import Match
    from app.schemas.player import Player


class MatchPlayerBase(BaseModel):
    """Base MatchPlayer schema."""

    is_starter: bool | None = None
    minutes_played: DBIndexInt | None = None
    rating: DBIndexInt | None = None


class MatchPlayerCreate(MatchPlayerBase):
    """MatchPlayer schema for creation."""

    match_id: DBIndexInt
    player_id: DBIndexInt
    is_starter: bool = True
    minutes_played: NonNegativeInt
    rating: RatingInt


class MatchPlayer(MatchPlayerBase):
    """MatchPlayer schema for returning data from DB."""

    is_starter: bool
    minutes_played: NonNegativeInt
    rating: RatingInt
    match: "Match"
    player: "Player"


class MatchPlayerUpdate(MatchPlayerBase):
    """MatchPlayer schema for updating."""


class MatchPlayerInDBBase(MatchPlayerBase):
    """Base MatchPlayer schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: DBIndexInt | None = None
    match_id: DBIndexInt | None = None
    player_id: DBIndexInt | None = None
    match: "Match"
    player: "Player"
