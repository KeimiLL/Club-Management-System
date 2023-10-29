"""Teams related endpoints."""


from typing import Annotated

from app.api import board_not_allowed, coach_not_allowed, viewer_not_allowed
from app.api.dependencies import paginate
from app.core.exceptions import ForbiddenException, MissingException
from app.crud import crud_team
from app.db.session import get_db
from app.models.team import Team
from app.models.user import User
from app.schemas.coach import CoachOnlyBaseInfo
from app.schemas.enums import HTTPResponseMessage, Roles
from app.schemas.misc import ItemsListWithTotal, Message, MessageFromEnum
from app.schemas.player import PlayerOnlyBaseInfo
from app.schemas.team import (
    TeamCreatePlayerIdList,
    TeamOnlyBaseInfo,
    TeamSideView,
    TeamTableView,
)
from fastapi import APIRouter, Depends, Path, status
from sqlalchemy.orm import Session

router = APIRouter()


@router.post(
    "",
    response_model=Message,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": MessageFromEnum},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def create_team_with_player_ids(
    team_player: TeamCreatePlayerIdList,
    _: Annotated[User, Depends(coach_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
):
    """Creates a new team and attaches players to it based on data from a POST request.

    Args:
        team_player (TeamCreatePlayerIdList): Team data from POST request.
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Returns:
        Message: The response signalling a successful operation.
    """
    crud_team.create_team_with_player_ids(
        team=team_player.team, player_ids=team_player.player_ids, db=db
    )
    return Message(message=HTTPResponseMessage.SUCCESS)


@router.get(
    "/all",
    response_model=list[TeamOnlyBaseInfo],
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": MessageFromEnum},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def get_teams(
    current_user: Annotated[User, Depends(board_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
):
    """Gets the list of all created teams depending on the current user's role.

    Args:
        current_user (Annotated[User, Depends]): Current user read from access token.
            Defaults to Depends(board_not_allowed).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Returns:
        list[TeamOnlyBaseInfo]: The list of all teams depending on the current user's role.
    """
    match current_user.role:
        case Roles.ADMIN | Roles.BOARD:
            teams = crud_team.get_all_teams(db=db)
        case Roles.COACH:
            teams = crud_team.get_all_teams_by_coach_id(user_id=current_user.id, db=db)
        case Roles.PLAYER:
            teams = (
                [current_user.player.team]
                if current_user.player.team is not None
                else []
            )
        case _:
            raise ForbiddenException()
    return teams


@router.get(
    "",
    response_model=ItemsListWithTotal[TeamTableView],
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": MessageFromEnum},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def get_teams_with_pagination(
    pagination: Annotated[dict[str, int], Depends(paginate)],
    current_user: Annotated[User, Depends(viewer_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
):
    """Gets teams with pagination depending on the current user's role.

    Args:
        pagination (Annotated[dict[str, int], Depends]): Pagination read from the query params.
            Defaults to Depends(paginate).
        current_user (Annotated[User, Depends]): Current user read from access token.
            Defaults to Depends(viewer_not_allowed).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        ForbiddenException: If the current user does not have sufficient permissions.

    Returns:
        ItemsListWithTotal[TeamTableView]: A list of teams alongside their total number.
    """

    match current_user.role:
        case Roles.ADMIN | Roles.BOARD:
            teams, total = crud_team.get_all_teams_with_pagination(**pagination, db=db)
        case Roles.COACH:
            teams, total = crud_team.get_teams_with_pagination_by_coach_id(
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
            raise ForbiddenException()
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


@router.get(
    "/{team_id}",
    response_model=TeamSideView,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": MessageFromEnum},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def get_team_by_id(
    team_id: Annotated[int, Path(ge=1, le=10**7)],
    current_user: Annotated[User, Depends(viewer_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
):
    """Returns the team by the given id.

    Args:
        team_id (Annotated[int, Path]): The requested team's id. Has to be greater than
            or equal to 1 and less than or equal to 10**7.
        current_user (Annotated[User, Depends]): Current user read from access token.
            Defaults to Depends(viewer_not_allowed).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        MissingException: If the current user is a player and it hasn't been assigned to a team.
        ForbiddenException: If the current user does not have sufficient permissions.

    Returns:
        TeamSideView: The requested team.
    """
    if current_user.role == Roles.PLAYER:
        if (team := current_user.player.team) is None:
            raise MissingException(Team.__name__)
    else:
        team = crud_team.get_team_by_id(team_id=team_id, db=db)

    if current_user.role != Roles.COACH or (
        current_user.role == Roles.COACH and current_user.id == team.coach_id
    ):
        return TeamSideView(
            id=team.id,
            name=team.name,
            players=[
                PlayerOnlyBaseInfo(
                    user_id=player.user_id, user_full_name=player.user.full_name
                )
                for player in team.players
            ],
            coach=CoachOnlyBaseInfo(
                user_id=team.coach.user.id,
                user_full_name=team.coach.user.full_name,
            )
            if team.coach is not None
            else None,
        )
    raise ForbiddenException()
