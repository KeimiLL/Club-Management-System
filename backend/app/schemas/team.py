"""File for Team schemas."""


from typing import TYPE_CHECKING

from pydantic import BaseModel, ConfigDict, Field, conint, conset

if TYPE_CHECKING:
    from app.schemas.coach import Coach, CoachOnlyBaseInfo
    from app.schemas.match import Match
    from app.schemas.player import Player, PlayerOnlyBaseInfo
    from app.schemas.training import Training


class TeamBase(BaseModel):
    """Base Team schema."""

    name: str | None = Field(None, min_length=3)


class TeamCreate(TeamBase):
    """Team schema for creation."""

    coach_id: int | None = Field(None, ge=1, le=10**7)
    name: str = Field(..., min_length=3)


class TeamCreatePlayerIdList(BaseModel):
    """Team schema for creation with a set of player ids."""

    team: TeamCreate
    player_ids: conset(conint(ge=1, lt=10**7), min_length=0)


class Team(TeamBase):
    """Team schema for returning data from DB."""

    name: str = Field(..., min_length=3)
    coach: "Coach | None"
    players: list["Player"]
    matches: list["Match"]
    trainings: list["Training"]


class TeamUpdate(TeamCreate):
    """Team schema for updating."""


class TeamUpdatePlayerIdList(TeamCreatePlayerIdList):
    """Team schema for updating with a set of player ids."""

    team: TeamUpdate


class TeamInDBBase(TeamBase):
    """Base Team schema for storing in DB."""

    model_config = ConfigDict(from_attributes=True)

    id: int | None = Field(None, ge=1, le=10**7)
    coach_id: int | None = Field(None, ge=1, le=10**7)
    coach: "Coach | None"
    players: list["Player"]
    matches: list["Match"]
    trainings: list["Training"]


class TeamOnlyBaseInfo(BaseModel):
    """Team schema for returning data from the database."""

    id: int = Field(..., ge=1, le=10**7)
    name: str = Field(..., min_length=3)


class TeamSideView(TeamOnlyBaseInfo):
    """Team schema for displaying data in the side panel."""

    coach: "CoachOnlyBaseInfo | None"
    players: list["PlayerOnlyBaseInfo"]


class TeamTableView(TeamOnlyBaseInfo):
    """Team schema for returning data to be shown in the teams' table."""

    coach_user_full_name: str | None = Field(None, min_length=4)
