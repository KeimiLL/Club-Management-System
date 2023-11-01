"""File for MatchPlayer schemas."""


from typing import TYPE_CHECKING

from pydantic import BaseModel, ConfigDict, Field, NonNegativeInt, conint, conset

if TYPE_CHECKING:
    from app.schemas.match import Match, MatchCreate
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


class MatchPlayerCreatePlayerIdList(BaseModel):
    """MatchPlayer schema for creation with a set of players ids."""

    match: "MatchCreate"
    player_ids: conset(conint(ge=1, lt=10**7), min_length=1)
