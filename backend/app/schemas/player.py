"""File for Player schemas."""


import datetime
from typing import TYPE_CHECKING

from app.schemas.misc import DBIndexInt
from pydantic import BaseModel, ConfigDict, PositiveInt

if TYPE_CHECKING:
    from app.schemas.injury import Injury
    from app.schemas.match import Match
    from app.schemas.team import Team
    from app.schemas.training import Training
    from app.schemas.user import User


class PlayerBase(BaseModel):
    """Base Player schema."""

    date_of_joining: datetime.date | None = None
    date_of_birth: datetime.date | None = None
    height: PositiveInt | None = None
    weight: PositiveInt | None = None
    notes: str | None = None
    is_injured: bool | None = None
    diet: str | None = None


class PlayerCreate(PlayerBase):
    """Player schema for creation."""

    user_id: DBIndexInt
    team_id: DBIndexInt
    date_of_joining: datetime.date
    date_of_birth: datetime.date
    height: PositiveInt
    weight: PositiveInt
    notes: str
    is_injured: bool = False


class Player(PlayerBase):
    """Player schema for returning data from DB."""

    date_of_joining: datetime.date
    date_of_birth: datetime.date
    height: PositiveInt
    weight: PositiveInt
    notes: str
    is_injured: bool
    user: "User"
    team: "Team"
    injuries: list["Injury"]
    matches: list["Match"]
    trainings: list["Training"]


class PlayerUpdate(PlayerBase):
    """Player schema for updating."""


class PlayerInDBBase(PlayerBase):
    """Base Player schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    user_id: DBIndexInt | None = None
    team_id: DBIndexInt | None = None
    user: "User"
    team: "Team"
    injuries: list["Injury"]
    matches: list["Match"]
    trainings: list["Training"]
