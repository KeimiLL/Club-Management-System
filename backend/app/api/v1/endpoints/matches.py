"""Matches related endpoints."""


from typing import Annotated

from app.api import player_not_allowed, viewer_not_allowed
from app.api.dependencies import paginate
from app.core.exceptions import ForbiddenException, GenericException
from app.crud import crud_match
from app.db.session import get_db
from app.models.user import User
from app.schemas.enums import HTTPResponseMessage, MatchEvent, Roles
from app.schemas.match import (
    MatchBase,
    MatchCreate,
    MatchInProgress,
    MatchScore,
    MatchScoreUpdate,
    MatchTableView,
)
from app.schemas.match_player import MatchPlayerCreatePlayerIdList
from app.schemas.misc import ItemsListWithTotal, Message, MessageFromEnum
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


@router.post(
    "/{match_id}/{match_event}",
    response_model=MatchBase,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": MessageFromEnum},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def update_match_state(
    match_id: Annotated[int, Path(ge=1, le=10**7)],
    match_event: Annotated[MatchEvent, Path()],
    _: Annotated[User, Depends(player_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
):
    """Handles a match with the given id and event type.

    Args:
        match_id (Annotated[int, Path]): The given match's id. Has to be greater than
            or equal to 1 and less than or equal to 10**7.
        match_event (Annotated[MatchEvent, Path]): The type of match event to be handled.
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        GenericException: If the current state of the match is in conflict with the given one.

    Returns:
        MatchBase: The match with an updated state.
    """
    match = crud_match.get_match_by_id(match_id=match_id, db=db)
    if (match_event == MatchEvent.START and match.has_started is True) or (
        match_event == MatchEvent.END
        and (match.has_ended is True or match.has_started is False)
    ):
        raise GenericException("Conflict with the current match state.")
    return crud_match.update_match_state(
        match_event=match_event,
        match_id=match_id,
        db=db,
    )


@router.post(
    "/{match_id}/score",
    response_model=MatchScore,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": MessageFromEnum},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def update_match_score(
    match_id: Annotated[int, Path(ge=1, le=10**7)],
    match_score_update: MatchScoreUpdate,
    _: Annotated[User, Depends(player_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
):
    """Handles a match with the given id and event type.

    Args:
        match_id (Annotated[int, Path]): The given match's id. Has to be greater than
            or equal to 1 and less than or equal to 10**7.
        match_score_update (MatchScoreUpdate): The match score to be set.
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        GenericException: If the current state of the match is in conflict with the given one.

    Returns:
        MatchScore: The match with an updated score.
    """
    match = crud_match.get_match_by_id(match_id=match_id, db=db)
    if match.has_started is False or match.has_ended is True:
        raise GenericException("Conflict with the current match state.")
    return crud_match.update_match_score(
        match_score=match_score_update,
        match_id=match_id,
        db=db,
    )


@router.get(
    "/in_progress",
    response_model=list[MatchInProgress],
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": MessageFromEnum},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def get_matches_in_progress_with_limit(
    _: Annotated[User, Depends(viewer_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
    limit: Annotated[int | None, Query(ge=1, le=10)] = None,
):
    """Gets all matches that are in progress, with an optional limit.

    Args:
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).
        limit (Annotated[int | None, Query]): Optional query parameter for the limit of
            the matches. Has to be greater than or equal to 1 and less than or equal to 10.
            Defaults to None.

    Returns:
        list[MatchInProgress]: List of matches in progress.
    """
    matches = crud_match.get_matches_in_progress_with_limit(limit=limit, db=db)
    return [
        MatchInProgress(**match.__dict__, team_name=match.team.name)
        for match in matches
    ]


@router.get(
    "",
    response_model=ItemsListWithTotal[MatchTableView],
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": MessageFromEnum},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def get_matches_with_pagination_by_team_id(
    pagination: Annotated[dict[str, int], Depends(paginate)],
    team_id: Annotated[int, Query(ge=1, lt=10000)],
    current_user: Annotated[User, Depends(viewer_not_allowed)],
    db: Annotated[Session, Depends(get_db)],
):
    """Gets the list of matches played by the team with the given id.

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
        ItemsListWithTotal[MatchTableView]: A list of matches alongside their total number.
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
        matches, total = crud_match.get_matches_with_pagination_by_team_id(
            **pagination, team_id=team_id, db=db
        )
        return ItemsListWithTotal[MatchTableView](
            items=[
                MatchTableView(**match.__dict__, team_name=match.team.name)
                for match in matches
            ],
            total=total,
        )
    raise ForbiddenException()
