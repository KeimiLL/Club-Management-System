"""Matches related endpoints."""


from typing import Annotated

from app.api import player_not_allowed
from app.crud import crud_match
from app.db.session import get_db
from app.models.user import User
from app.schemas.enums import HTTPResponseMessage
from app.schemas.match import MatchCreate
from app.schemas.match_player import MatchPlayerCreatePlayerIdList
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
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def create_match_with_player_ids(
    match_player: MatchPlayerCreatePlayerIdList,
    _: Annotated[User, Depends(player_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
):
    """Creates a new match and its squad based on data from a POST request.

    Args:
        match_player (MatchPlayerCreatePlayerIdList): Match data from POST request.
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Returns:
        Message: The response signalling a successful operation.
    """
    crud_match.create_match_with_player_ids(
        match=MatchCreate(**match_player.match.__dict__),
        player_ids=match_player.player_ids,
        db=db,
    )
    return Message(message=HTTPResponseMessage.SUCCESS)
