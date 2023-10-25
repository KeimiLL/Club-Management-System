"""Coaches related endpoints."""


from __future__ import annotations

from typing import Annotated

from app.api.dependencies import get_user_from_token, refresh_token_dependency
from app.core.exceptions import ForbiddenException
from app.crud import crud_coach
from app.db.session import get_db
from app.models.user import User
from app.schemas.coach import CoachCreate, CoachOnlyBaseInfo, CoachOnlyName
from app.schemas.enums import HTTPResponseMessage, Roles
from app.schemas.misc import Message, MessageFromEnum
from fastapi import APIRouter, Depends, Query, status
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
def create_new_coach(
    coach: CoachCreate,
    current_user: Annotated[User, Depends(get_user_from_token)],
    db: Annotated[Session, Depends(get_db)],
):
    """Creates a new coach based on data from a POST request.

    Args:
        coach (CoachCreate): Coach data from POST request.
        current_user (Annotated[User, Depends]): Current user read from access token.
            Defaults to Depends(get_user_from_token).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        ForbiddenException: If the current user does not have sufficient permissions.

    Returns:
        Message: The response signalling a successful operation.
    """
    if current_user.role == Roles.ADMIN:
        crud_coach.create_new_coach(
            coach=coach,
            db=db,
        )
        return Message(message=HTTPResponseMessage.SUCCESS)
    raise ForbiddenException("coach")


@router.get(
    "/all",
    response_model=list[CoachOnlyBaseInfo],
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
    },
)
def get_all_coaches(
    _: Annotated[str, Depends(refresh_token_dependency)],
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
        status.HTTP_403_FORBIDDEN: {"model": Message},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def get_coach_by_team_id(
    team_id: Annotated[int, Query(ge=1, lt=10000)],
    current_user: Annotated[User, Depends(get_user_from_token)],
    db: Annotated[Session, Depends(get_db)],
):
    """Gets the coach that is assigned to the team with the given id.

    Args:
        team_id (Annotated[int, Query]): The given team's id. Has to be greater than
            1 and less than or equal to 10**7.
        current_user (Annotated[User, Depends]): Current user read from access token.
            Defaults to Depends(get_user_from_token).
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
    raise ForbiddenException("coach")
