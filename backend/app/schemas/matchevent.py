"""File for MatchEvent schemas."""


from app.schemas.enums import EventType
from pydantic import BaseModel, ConfigDict, Field


class MatchEventBase(BaseModel):
    """Base MatchEvent schema."""

    minute: int | None = Field(None, ge=1, le=120)
    event_type: EventType | None = None
    description: str | None = None


class MatchEventCreate(MatchEventBase):
    """MatchEvent schema for creation."""

    match_id: int = Field(..., ge=1, le=10**7)
    minute: int = Field(..., ge=1, le=120)
    event_type: EventType
    description: str


class MatchEvent(MatchEventBase):
    """MatchEvent schema for returning data from DB."""

    minute: int = Field(..., ge=1, le=120)
    event_type: EventType
    description: str


class MatchEventInDBBase(MatchEventBase):
    """Base MatchEvent schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: int | None = Field(None, ge=1, le=10**7)
    match_id: int | None = Field(None, ge=1, le=10**7)
