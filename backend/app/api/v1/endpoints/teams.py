"""Teams related endpoints."""


from typing import Annotated

from app.api.dependencies import get_user_from_token, paginate, refresh_token_dependency
from app.core.exceptions import ForbiddenException
from app.crud.crud_team import (
    create_new_team,
    get_all_teams,
    get_all_teams_with_pagination,
)
from app.db.session import get_db
from app.models.user import User
from app.schemas.enums import HTTPResponseMessage, Roles
from app.schemas.misc import ItemsListWithTotal, Message, MessageFromEnum
from app.schemas.team import TeamCreate, TeamOnlyBaseInfo, TeamTableView
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
    current_user: Annotated[User, Depends(get_user_from_token)],
    db: Annotated[Session, Depends(get_db)],
):
    """Creates a new team based on data from a POST request.

    Args:
        team (TeamCreate): Team data from POST request.
        current_user (Annotated[User, Depends]): Current User read from access token.
            Defaults to Depends(get_user_from_token).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        ForbiddenException: If the current team does not have sufficient permissions.

    Returns:
        Message: The response signalling a successful operation.
    """
    if current_user.role in (Roles.ADMIN, Roles.BOARD):
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


@router.get(
    "",
    response_model=ItemsListWithTotal[TeamTableView],
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": Message},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def get_teams_with_pagination(
    pagination: Annotated[dict[str, int], Depends(paginate)],
    current_user: Annotated[User, Depends(get_user_from_token)],
    db: Annotated[Session, Depends(get_db)],
):
    """Creates a new team based on data from a POST request.

    Args:
        pagination (Annotated[dict[str, int], Depends]): Pagination read from the query params.
            Defaults to Depends(paginate).
        current_user (Annotated[User, Depends]): Current user read from access token.
            Defaults to Depends(get_user_from_token).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        ForbiddenException: If the current user does not have sufficient permissions.

    Returns:
        ItemsListWithTotal[TeamTableView]: A list of teams alongside their total number.
    """
    if current_user.role in (Roles.ADMIN, Roles.BOARD, Roles.COACH):
        teams, total = get_all_teams_with_pagination(**pagination, db=db)
        return ItemsListWithTotal[TeamTableView](
            items=[
                TeamTableView(
                    **team.__dict__,
                    coach_user_full_name=team.coach.user.full_name
                    if team.coach is not None
                    else None
                )
                for team in teams
            ],
            total=total,
        )
    raise ForbiddenException("team")
