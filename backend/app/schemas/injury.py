"""File for Injury schemas."""


from app.schemas.enums import Injuries
from pydantic import BaseModel, ConfigDict, Field


class InjuryBase(BaseModel):
    """Base Injury schema."""

    injury_type: Injuries | None = None
    prescriptions: str | None = None


class InjuryCreate(InjuryBase):
    """Injury schema for creation."""

    player_id: int = Field(..., ge=1)
    injury_type: Injuries


class Injury(InjuryBase):
    """Injury schema for returning data from DB."""

    injury_type: Injuries


class InjuryUpdate(InjuryBase):
    """Injury schema for updating."""


class InjuryInDBBase(InjuryBase):
    """Base Injury schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: int | None = None
    player_id: int | None = None
