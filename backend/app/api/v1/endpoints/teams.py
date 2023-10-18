"""Teams related endpoints."""


from typing import Annotated

from app.api.dependencies import get_user_from_token, paginate, refresh_token_dependency
from app.core.exceptions import ForbiddenException
from app.crud.crud_team import (
    create_team_with_player_ids,
    get_all_teams,
    get_all_teams_with_pagination,
    get_teams_with_pagination_by_coach_id,
)
from app.db.session import get_db
from app.models.user import User
from app.schemas.enums import HTTPResponseMessage, Roles
from app.schemas.misc import ItemsListWithTotal, Message, MessageFromEnum
from app.schemas.team import TeamCreatePlayerIdList, TeamOnlyBaseInfo, TeamTableView
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
    team_player: TeamCreatePlayerIdList,
    current_user: Annotated[User, Depends(get_user_from_token)],
    db: Annotated[Session, Depends(get_db)],
):
    """Creates a new team and attaches players to it based on data from a POST request.

    Args:
        team_player (TeamCreatePlayerIdList): Team data from POST request.
        current_user (Annotated[User, Depends]): Current User read from access token.
            Defaults to Depends(get_user_from_token).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        ForbiddenException: If the current team does not have sufficient permissions.

    Returns:
        Message: The response signalling a successful operation.
    """
    if current_user.role in (Roles.ADMIN, Roles.BOARD):
        create_team_with_player_ids(
            team=team_player.team, player_ids=team_player.player_ids, db=db
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
    """Gets teams with pagination depending on the current user's role.

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

    match current_user.role:
        case Roles.ADMIN | Roles.BOARD:
            teams, total = get_all_teams_with_pagination(**pagination, db=db)
        case Roles.COACH:
            teams, total = get_teams_with_pagination_by_coach_id(
                **pagination, user_id=current_user.id, db=db
            )
        case Roles.PLAYER:
            teams, total = (
                (
                    [current_user.player.team],
                    1,
                )
                if current_user.player.team is not None
                else ([], 0)
            )
        case _:
            raise ForbiddenException("team")
    return ItemsListWithTotal[TeamTableView](
        items=[
            TeamTableView(
                **team.__dict__,
                coach_user_full_name=team.coach.user.full_name
                if team.coach is not None
                else None,
            )
            for team in teams
        ],
        total=total,
    )
