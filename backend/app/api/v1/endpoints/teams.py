"""Teams related endpoints."""


from typing import Annotated

from app.api.dependencies import get_user_from_token, refresh_token_dependency
from app.core.exceptions import ForbiddenException
from app.crud.crud_team import create_new_team, get_all_teams
from app.db.session import get_db
from app.models.team import Team
from app.schemas.enums import HTTPResponseMessage, Roles
from app.schemas.misc import Message, MessageFromEnum
from app.schemas.team import TeamCreate, TeamOnlyBaseInfo
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

router = APIRouter()


@router.post(
    "",
    response_model=Message,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": Message},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def create_team(
    team: TeamCreate,
    current_team: Annotated[Team, Depends(get_user_from_token)],
    db: Annotated[Session, Depends(get_db)],
):
    """Creates a new team based on data from a POST request.

    Args:
        team (TeamCreate): Team data from POST request.
        current_team (Annotated[Team, Depends]): Current team read from access token.
            Defaults to Depends(get_team_from_token).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        ForbiddenException: If the current team does not have sufficient permissions.

    Returns:
        Message: The response signalling a successful operation.
    """
    if current_team.role in (Roles.ADMIN, Roles.BOARD):
        create_new_team(
            team=team,
            db=db,
        )
        return Message(message=HTTPResponseMessage.SUCCESS)
    raise ForbiddenException("team")


@router.get(
    "/all",
    response_model=list[TeamOnlyBaseInfo],
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
    },
)
def get_teams(
    _: Annotated[str, Depends(refresh_token_dependency)],
    db: Annotated[Session, Depends(get_db)],
):
    """Gets the list of all registered teams.

    Args:
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Returns:
        list[TeamOnlyBaseInfo]: The list of all teams.
    """
    return get_all_teams(db=db)
