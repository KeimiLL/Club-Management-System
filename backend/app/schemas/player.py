"""File for Player schemas."""


import datetime
from typing import TYPE_CHECKING

from pydantic import BaseModel, ConfigDict, Field, PositiveInt

if TYPE_CHECKING:
    from app.schemas.injury import Injury
    from app.schemas.match import Match
    from app.schemas.team import Team, TeamOnlyBaseInfo
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

    user_id: int = Field(..., ge=1, le=10**7)
    team_id: int | None = Field(None, ge=1, le=10**7)
    date_of_joining: datetime.date
    date_of_birth: datetime.date
    height: PositiveInt
    weight: PositiveInt
    is_injured: bool = False


class Player(PlayerBase):
    """Player schema for returning data from DB."""

    date_of_joining: datetime.date
    date_of_birth: datetime.date
    height: PositiveInt
    weight: PositiveInt
    is_injured: bool
    user: "User"
    team: "Team | None"
    injuries: list["Injury"]
    matches: list["Match"]
    trainings: list["Training"]


class PlayerUpdate(PlayerBase):
    """Player schema for updating."""


class PlayerInDBBase(PlayerBase):
    """Base Player schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    user_id: int | None = Field(None, ge=1, le=10**7)
    team_id: int | None = Field(None, ge=1, le=10**7)
    user: "User"
    team: "Team | None"
    injuries: list["Injury"]
    matches: list["Match"]
    trainings: list["Training"]


class PlayerOnlyBaseInfo(BaseModel):
    """Player schema for returning data from the database."""

    user_id: int = Field(..., ge=1, le=10**7)
    user_full_name: str = Field(..., min_length=4)


class PlayerTableView(PlayerOnlyBaseInfo):
    """Player schema for returning data to be shown in the players' table."""

    is_injured: bool
    date_of_birth: datetime.date


class PlayerSideView(PlayerOnlyBaseInfo):
    """Player schema for displaying data in the side panel."""

    date_of_joining: datetime.date
    date_of_birth: datetime.date
    height: PositiveInt
    weight: PositiveInt
    is_injured: bool = False
    diet: str | None = None
    team: "TeamOnlyBaseInfo"
