"""File for MatchPlayer schemas."""


from typing import TYPE_CHECKING

from pydantic import BaseModel, ConfigDict, Field, NonNegativeInt

if TYPE_CHECKING:
    from app.schemas.match import Match
    from app.schemas.player import Player


class MatchPlayerBase(BaseModel):
    """Base MatchPlayer schema."""

    is_starter: bool = False
    minutes_played: NonNegativeInt = 0
    rating: int | None = Field(None, ge=1, le=10)


class MatchPlayerCreate(MatchPlayerBase):
    """MatchPlayer schema for creation."""

    match_id: int = Field(..., ge=1, le=10**7)
    player_id: int = Field(..., ge=1, le=10**7)


class MatchPlayer(MatchPlayerBase):
    """MatchPlayer schema for returning data from DB."""

    match: "Match"
    player: "Player"


class MatchPlayerUpdate(MatchPlayerBase):
    """MatchPlayer schema for updating."""


class MatchPlayerInDBBase(MatchPlayerBase):
    """Base MatchPlayer schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: int | None = Field(None, ge=1, le=10**7)
    match_id: int | None = Field(None, ge=1, le=10**7)
    player_id: int | None = Field(None, ge=1, le=10**7)
    match: "Match"
    player: "Player"
