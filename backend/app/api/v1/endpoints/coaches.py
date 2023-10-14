"""Coaches related endpoints."""


from typing import Annotated

from app.api.dependencies import get_user_from_token, refresh_token_dependency
from app.core.exceptions import ForbiddenException
from app.crud.crud_coach import create_new_coach, get_all_coaches
from app.db.session import get_db
from app.models.user import User
from app.schemas.coach import CoachCreate, CoachOnlyBaseInfo
from app.schemas.enums import HTTPResponseMessage, Roles
from app.schemas.misc import Message, MessageFromEnum
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
def create_coach(
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
        create_new_coach(
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
def get_coaches(
    _: Annotated[str, Depends(refresh_token_dependency)],
    db: Annotated[Session, Depends(get_db)],
):
    """Gets the list of all registered coaches.

    Args:
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Returns:
        list[CoachOnlyBaseInfo]: The list of all coaches.
    """
    coaches = get_all_coaches(db=db)
    return [
        CoachOnlyBaseInfo(**coach.__dict__, user_full_name=coach.user.full_name)
        for coach in coaches
    ]
