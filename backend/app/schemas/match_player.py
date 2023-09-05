"""File for MatchPlayer schemas."""


from typing import TYPE_CHECKING

from pydantic import BaseModel, ConfigDict, Field

if TYPE_CHECKING:
    from app.schemas.match import Match
    from app.schemas.player import Player


class MatchPlayerBase(BaseModel):
    """Base MatchPlayer schema."""

    starter: bool | None = None
    minutes_played: int | None = None
    rating: int | None = None


class MatchPlayerCreate(MatchPlayerBase):
    """MatchPlayer schema for creation."""

    match_id: int = Field(..., ge=1)
    player_id: int = Field(..., ge=1)
    starter: bool = True
    minutes_played: int
    rating: int


class MatchPlayer(MatchPlayerBase):
    """MatchPlayer schema for returning data from DB."""

    starter: bool
    minutes_played: int
    rating: int
    match: "Match"
    player: "Player"


class MatchPlayerUpdate(MatchPlayerBase):
    """MatchPlayer schema for updating."""


class MatchPlayerInDBBase(MatchPlayerBase):
    """Base MatchPlayer schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: int | None = None
    match_id: int | None = None
    player_id: int | None = None
    match: "Match"
    player: "Player"
