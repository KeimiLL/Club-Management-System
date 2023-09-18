"""File for Injury schemas."""


from app.schemas.enums import Injuries
from app.schemas.misc import DBIndexInt
from pydantic import BaseModel, ConfigDict


class InjuryBase(BaseModel):
    """Base Injury schema."""

    injury_type: Injuries | None = None
    prescriptions: str | None = None


class InjuryCreate(InjuryBase):
    """Injury schema for creation."""

    player_id: DBIndexInt
    injury_type: Injuries


class Injury(InjuryBase):
    """Injury schema for returning data from DB."""

    injury_type: Injuries


class InjuryUpdate(InjuryBase):
    """Injury schema for updating."""


class InjuryInDBBase(InjuryBase):
    """Base Injury schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: DBIndexInt | None = None
    player_id: DBIndexInt | None = None
