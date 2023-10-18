"""Players related endpoints."""


from typing import Annotated

from app.api.dependencies import get_user_from_token, refresh_token_dependency
from app.core.exceptions import ForbiddenException
from app.crud.crud_player import create_new_player, get_all_players
from app.db.session import get_db
from app.models.user import User
from app.schemas.enums import HTTPResponseMessage, Roles
from app.schemas.misc import Message, MessageFromEnum
from app.schemas.player import PlayerCreate, PlayerOnlyBaseInfo
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
def create_player(
    player: PlayerCreate,
    current_user: Annotated[User, Depends(get_user_from_token)],
    db: Annotated[Session, Depends(get_db)],
):
    """Creates a new player based on data from a POST request.

    Args:
        player (PlayerCreate): Player data from POST request.
        current_user (Annotated[User, Depends]): Current user read from access token.
            Defaults to Depends(get_user_from_token).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        ForbiddenException: If the current user does not have sufficient permissions.

    Returns:
        Message: The response signalling a successful operation.
    """
    if current_user.role in (Roles.ADMIN, Roles.BOARD):
        create_new_player(
            player=player,
            db=db,
        )
        return Message(message=HTTPResponseMessage.SUCCESS)
    raise ForbiddenException("player")


@router.get(
    "/all",
    response_model=list[PlayerOnlyBaseInfo],
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
    },
)
def get_players(
    _: Annotated[str, Depends(refresh_token_dependency)],
    db: Annotated[Session, Depends(get_db)],
):
    """Gets the list of all registered players.

    Args:
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Returns:
        list[PlayerOnlyBaseInfo]: The list of all players.
    """
    players = get_all_players(db=db)
    return [
        PlayerOnlyBaseInfo(**player.__dict__, user_full_name=player.user.full_name)
        for player in players
    ]
