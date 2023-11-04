"""MatchEvents related endpoints."""


from typing import Annotated

from app.api import player_not_allowed
from app.core.exceptions import GenericException
from app.crud import crud_matchevent
from app.crud.crud_match import get_match_by_id
from app.db.session import get_db
from app.models.user import User
from app.schemas.enums import HTTPResponseMessage
from app.schemas.matchevent import MatchEventCreate
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
        status.HTTP_403_FORBIDDEN: {"model": MessageFromEnum},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def create_new_matchevent(
    matchevent: MatchEventCreate,
    _: Annotated[User, Depends(player_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
):
    """Creates a new matchevent based on data from a POST request.

    Args:
        matchevent (MatchEventCreate): MatchEvent data from POST request.
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        GenericException: If the current state of the match is in conflict with the given one.

    Returns:
        Message: The response signalling a successful operation.
    """
    match = get_match_by_id(match_id=matchevent.match_id, db=db)
    if match.has_started is False or match.has_ended is True:
        raise GenericException("Conflict with the current match state.")
    crud_matchevent.create_new_matchevent(
        matchevent=matchevent,
        db=db,
    )
    return Message(message=HTTPResponseMessage.SUCCESS)
