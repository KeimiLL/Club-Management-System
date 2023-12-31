"""Players related endpoints."""


from typing import Annotated

from app.api import board_not_allowed, player_not_allowed, viewer_not_allowed
from app.api.dependencies import paginate
from app.core.exceptions import ForbiddenException, MissingException
from app.crud import crud_player
from app.db.session import get_db
from app.models.team import Team
from app.models.user import User
from app.schemas.enums import HTTPResponseMessage, Roles
from app.schemas.misc import ItemsListWithTotal, Message, MessageFromEnum
from app.schemas.player import (
    PlayerCreate,
    PlayerOnlyBaseInfo,
    PlayerSideView,
    PlayerTableView,
    PlayerUpdate,
)
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
def create_new_player(
    player: PlayerCreate,
    _: Annotated[User, Depends(board_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
):
    """Creates a new player based on data from a POST request.

    Args:
        player (PlayerCreate): Player data from POST request.
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Returns:
        Message: The response signalling a successful operation.
    """
    crud_player.create_new_player(
        player=player,
        db=db,
    )
    return Message(message=HTTPResponseMessage.SUCCESS)


@router.get(
    "/all",
    response_model=list[PlayerOnlyBaseInfo],
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": MessageFromEnum},
        status.HTTP_404_NOT_FOUND: {"model": Message},
    },
)
def get_all_players(
    _: Annotated[User, Depends(player_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
    team_id: Annotated[int | None, Query(ge=1, lt=10000)] = None,
):
    """Gets the list of all registered players, optionally filtered by their team_id.

    Args:
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).
        team_id (Annotated[int | None, Query], optional): The given team's id.
            Has to be greater than 1 and less than or equal to 10**7. Defaults to None.

    Returns:
        list[PlayerOnlyBaseInfo]: The list of all players.
    """
    players = crud_player.get_all_players(db=db, team_id=team_id)
    return [
        PlayerOnlyBaseInfo(**player.__dict__, user_full_name=player.user.full_name)
        for player in players
    ]


@router.get(
    "",
    response_model=ItemsListWithTotal[PlayerTableView],
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": MessageFromEnum},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def get_players_with_pagination_by_team_id(
    pagination: Annotated[dict[str, int], Depends(paginate)],
    team_id: Annotated[int, Query(ge=1, lt=10000)],
    current_user: Annotated[User, Depends(viewer_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
):
    """Gets the list of players that play in the team with the given id.

    Args:
        pagination (Annotated[dict[str, int], Depends]): Pagination read from the query params.
            Defaults to Depends(paginate).
        team_id (Annotated[int, Query]): The given team's id. Has to be greater than
            1 and less than or equal to 10**7.
        current_user (Annotated[User, Depends]): Current user read from access token.
            Defaults to Depends(viewer_not_allowed).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        ForbiddenException: If the current user does not have sufficient permissions.

    Returns:
        ItemsListWithTotal[PlayerTableView]: A list of players alongside their total number.
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
        players, total = crud_player.get_players_with_pagination_by_team_id(
            **pagination, team_id=team_id, db=db
        )
        return ItemsListWithTotal[PlayerTableView](
            items=[
                PlayerTableView(**player.__dict__, user_full_name=player.user.full_name)
                for player in players
            ],
            total=total,
        )
    raise ForbiddenException()


@router.get(
    "/{player_id}",
    response_model=PlayerSideView,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": MessageFromEnum},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def get_player_by_user_id(
    player_id: Annotated[int, Path(ge=1, le=10**7)],
    current_user: Annotated[User, Depends(viewer_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
):
    """Returns the player by the given id.

    Args:
        player_id (Annotated[int, Path]): The requested player's id. Has to be greater than
            or equal to 1 and less than or equal to 10**7.
        current_user (Annotated[User, Depends]): Current user read from access token.
            Defaults to Depends(viewer_not_allowed).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        MissingException: If a player with the given id exists, but it isn't assigned to a team.
        ForbiddenException: If the current user does not have sufficient permissions.

    Returns:
        PlayerSideView: The requested player.
    """
    if current_user.role == Roles.PLAYER:
        if player_id != current_user.id:
            raise ForbiddenException()
        if current_user.player.team is None:
            raise MissingException(Team.__name__)
        player_dict = current_user.player.__dict__
        del player_dict["team"]
        return PlayerSideView(
            **player_dict,
            user_full_name=current_user.full_name,
            team=TeamOnlyBaseInfo(**current_user.player.team.__dict__)
        )
    if current_user.role in (Roles.ADMIN, Roles.BOARD):
        player = crud_player.get_player_by_user_id(user_id=player_id, db=db)
        if player.team is None:
            raise MissingException(Team.__name__)
        player_dict = player.__dict__
        del player_dict["team"]
        return PlayerSideView(
            **player_dict,
            user_full_name=player.user.full_name,
            team=TeamOnlyBaseInfo(**player.team.__dict__)
        )
    if current_user.role == Roles.COACH:
        player = crud_player.get_player_by_user_id(user_id=player_id, db=db)
        coach_id = player.team.coach_id if player.team is not None else None
        if coach_id != current_user.id:
            raise ForbiddenException()
        if player.team is None:
            raise MissingException(Team.__name__)
        player_dict = player.__dict__
        del player_dict["team"]
        return PlayerSideView(
            **player_dict,
            user_full_name=player.user.full_name,
            team=TeamOnlyBaseInfo(**player.team.__dict__)
        )
    raise ForbiddenException()


@router.delete(
    "/{player_id}",
    response_model=Message,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": MessageFromEnum},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def delete_player(
    player_id: Annotated[int, Path(ge=1, le=10**7)],
    _: Annotated[User, Depends(board_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
):
    """Deletes the player that matches the given user id.

    Args:
        player_id (Annotated[int, Path]): The given player's id. Has to be greater than
            or equal to 1 and less than or equal to 10**7.
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Returns:
        Message: The response signalling a successful operation.
    """
    crud_player.delete_player(
        user_id=player_id,
        db=db,
    )
    return Message(message=HTTPResponseMessage.SUCCESS)


@router.put(
    "/{player_id}",
    response_model=PlayerSideView,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": MessageFromEnum},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def update_player(
    player_id: Annotated[int, Path(ge=1, le=10**7)],
    player: PlayerUpdate,
    _: Annotated[User, Depends(board_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
):
    """Updates player data with the given data.

    Args:
        player_id (Annotated[int, Path]): The given player's id. Has to be greater than
            or equal to 1 and less than or equal to 10**7.
        player (PlayerUpdate): Player data to update.
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Returns:
        PlayerSideView: The updated player.
    """
    updated_player = crud_player.update_player(
        user_id=player_id, player_update=player, db=db
    )
    return PlayerSideView(
        **updated_player.__dict__,
        user_full_name=updated_player.user.full_name,
        team=TeamOnlyBaseInfo(**updated_player.team.__dict__)
        if updated_player.team is not None
        else None
    )
