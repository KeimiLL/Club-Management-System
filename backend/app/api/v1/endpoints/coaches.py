"""Coaches related endpoints."""


from typing import Annotated

from app.api import board_not_allowed, viewer_not_allowed
from app.core.exceptions import ForbiddenException, MissingException
from app.crud import crud_coach
from app.db.session import get_db
from app.models.coach import Coach
from app.models.team import Team
from app.models.user import User
from app.schemas.coach import (
    CoachCreate,
    CoachOnlyBaseInfo,
    CoachOnlyName,
    CoachPopupView,
    CoachUpdate,
)
from app.schemas.enums import HTTPResponseMessage, Roles
from app.schemas.misc import Message, MessageFromEnum
from app.schemas.team import TeamOnlyBaseInfo
from fastapi import APIRouter, Depends, Path, Query, status
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
def create_new_coach(
    coach: CoachCreate,
    _: Annotated[User, Depends(board_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
):
    """Creates a new coach based on data from a POST request.

    Args:
        coach (CoachCreate): Coach data from POST request.
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Returns:
        Message: The response signalling a successful operation.
    """
    crud_coach.create_new_coach(
        coach=coach,
        db=db,
    )
    return Message(message=HTTPResponseMessage.SUCCESS)


@router.get(
    "/all",
    response_model=list[CoachOnlyBaseInfo],
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": MessageFromEnum},
        status.HTTP_404_NOT_FOUND: {"model": Message},
    },
)
def get_all_coaches(
    _: Annotated[User, Depends(viewer_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
):
    """Gets the list of all registered coaches.

    Args:
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Returns:
        list[CoachOnlyBaseInfo]: The list of all coaches.
    """
    coaches = crud_coach.get_all_coaches(db=db)
    return [
        CoachOnlyBaseInfo(**coach.__dict__, user_full_name=coach.user.full_name)
        for coach in coaches
    ]


@router.get(
    "",
    response_model=CoachOnlyName,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": MessageFromEnum},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def get_coach_by_team_id(
    team_id: Annotated[int, Query(ge=1, lt=10000)],
    current_user: Annotated[User, Depends(viewer_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
):
    """Gets the coach that is assigned to the team with the given id.

    Args:
        team_id (Annotated[int, Query]): The given team's id. Has to be greater than
            1 and less than or equal to 10**7.
        current_user (Annotated[User, Depends]): Current user read from access token.
            Defaults to Depends(viewer_not_allowed).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        ForbiddenException: If the current user does not have sufficient permissions.

    Returns:
        CoachOnlyName: The team's coach.
    """
    if (
        current_user.role in (Roles.ADMIN, Roles.BOARD)
        or (
            current_user.role == Roles.COACH
            and team_id in [team.id for team in current_user.coach.teams]
        )
        or (
            current_user.role == Roles.PLAYER and team_id == current_user.player.team_id
        )
    ):
        coach = crud_coach.get_coach_by_team_id(team_id=team_id, db=db)
        return CoachOnlyName(user_full_name=coach.user.full_name if coach else None)
    raise ForbiddenException()


@router.get(
    "/{coach_id}",
    response_model=CoachPopupView,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": MessageFromEnum},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def get_coach_by_user_id(
    coach_id: Annotated[int, Path(ge=1, le=10**7)],
    current_user: Annotated[User, Depends(viewer_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
):
    """Returns the coach by the given id.

    Args:
        coach_id (Annotated[int, Path]): The requested coach's id. Has to be greater than
            or equal to 1 and less than or equal to 10**7.
        current_user (Annotated[User, Depends]): Current user read from access token.
            Defaults to Depends(viewer_not_allowed).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        MissingException: If a coach with the given id exists, but it have a team assigned to them.
        ForbiddenException: If the current user does not have sufficient permissions.

    Returns:
        CoachPopupView: The requested coach.
    """
    if current_user.role == Roles.COACH:
        if coach_id != current_user.id:
            raise ForbiddenException()
        if not current_user.coach.teams:
            raise MissingException(Team.__name__)
        return CoachPopupView(
            **current_user.coach.__dict__,
            user_full_name=current_user.full_name,
            teams=[
                TeamOnlyBaseInfo(**team.__dict__) for team in current_user.coach.teams
            ]
        )
    if current_user.role in (Roles.ADMIN, Roles.BOARD):
        coach = crud_coach.get_coach_by_user_id(user_id=coach_id, db=db)
        return CoachPopupView(
            **coach.__dict__,
            user_full_name=current_user.full_name,
            teams=[TeamOnlyBaseInfo(**team.__dict__) for team in coach.teams]
        )
    if current_user.role == Roles.PLAYER:
        team_coach_id = (
            current_user.player.team.coach_id
            if current_user.player.team is not None
            else None
        )
        if current_user.player.team is None:
            raise MissingException(Team.__name__)
        if current_user.player.team.coach is None:
            raise MissingException(Coach.__name__)
        if coach_id != team_coach_id:
            raise ForbiddenException()
        return CoachPopupView(
            **current_user.player.team.coach.__dict__,
            user_full_name=current_user.full_name,
            teams=[
                TeamOnlyBaseInfo(**team.__dict__)
                for team in current_user.player.team.coach.teams
            ]
        )
    raise ForbiddenException()


@router.delete(
    "/{coach_id}",
    response_model=Message,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": MessageFromEnum},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def delete_coach(
    coach_id: Annotated[int, Path(ge=1, le=10**7)],
    _: Annotated[User, Depends(board_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
):
    """Deletes the coach that matches the given user id.

    Args:
        coach_id (Annotated[int, Path]): The given cooach's id. Has to be greater than
            or equal to 1 and less than or equal to 10**7.
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Returns:
        Message: The response signalling a successful operation.
    """
    crud_coach.delete_coach(
        user_id=coach_id,
        db=db,
    )
    return Message(message=HTTPResponseMessage.SUCCESS)


@router.put(
    "/{coach_id}",
    response_model=CoachPopupView,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": MessageFromEnum},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def update_coach(
    coach_id: Annotated[int, Path(ge=1, le=10**7)],
    coach: CoachUpdate,
    _: Annotated[User, Depends(board_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
):
    """Updates coach data with the given data.

    Args:
        coach_id (Annotated[int, Path]): The given coach's id. Has to be greater than
            or equal to 1 and less than or equal to 10**7.
        coach (CoachUpdate): Coach data to update.
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Returns:
        CoachPopupView: The updated coach.
    """
    updated_coach = crud_coach.update_coach(user_id=coach_id, coach_update=coach, db=db)
    return CoachPopupView(
        **updated_coach.__dict__,
        user_full_name=updated_coach.user.full_name,
        teams=[TeamOnlyBaseInfo(**team.__dict__) for team in updated_coach.teams]
    )
