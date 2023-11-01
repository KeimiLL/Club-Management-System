"""File for testing match CRUD operations."""


import pytest
from app.core.exceptions import MissingException
from app.crud.crud_coach import create_new_coach
from app.crud.crud_match import (
    create_match_with_player_ids,
    create_new_match,
    get_match_by_id,
    update_match_state,
)
from app.crud.crud_player import create_new_player
from app.crud.crud_team import create_new_team
from app.crud.crud_user import create_new_user
from app.schemas.coach import CoachCreate
from app.schemas.enums import MatchEvent
from app.schemas.match import MatchCreate
from app.schemas.player import PlayerCreate
from app.schemas.team import TeamCreate
from app.schemas.user import UserCreate
from app.tests.conftest import (
    coach_create,
    match_create,
    player_create,
    team_create,
    user_create_unique_1,
)
from sqlalchemy.orm import Session


@pytest.mark.parametrize(
    "user,coach,team,match",
    [(user_create_unique_1, coach_create, team_create, match_create)],
)
def test_correct__create_new_match(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    match: MatchCreate,
    db_session: Session,
) -> None:
    """Tests creating a match.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        match (MatchCreate): Match to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    new_match = create_new_match(match, db_session)
    assert new_match.notes == match.notes
    assert new_match.date == match.date
    assert new_match.has_started is False
    assert new_match.team.name == team.name
    if new_match.team.coach is not None:
        assert new_match.team.coach.date_of_birth == coach.date_of_birth


@pytest.mark.parametrize(
    "user,coach,team,match",
    [(user_create_unique_1, coach_create, team_create, match_create)],
)
def test_correct__get_match_by_id(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    match: MatchCreate,
    db_session: Session,
) -> None:
    """Tests getting a match by id.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        match (MatchCreate): Match to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    new_match = create_new_match(match, db_session)
    match_by_id = get_match_by_id(new_match.id, db_session)
    assert match_by_id.notes == match.notes
    assert match_by_id.date == match.date
    assert new_match.has_started is False
    assert match_by_id.team.name == team.name
    if match_by_id.team.coach is not None:
        assert match_by_id.team.coach.date_of_birth == coach.date_of_birth


@pytest.mark.parametrize(
    "match_id",
    [0, 1000000],
)
def test_incorrect__get_match_by_id(
    match_id: int,
    db_session: Session,
) -> None:
    """Tests getting a missing match by id.

    Args:
        match_id (int): Match id to be read.
        db_session (Session): Database session.
    """
    with pytest.raises(MissingException) as excinfo:
        get_match_by_id(match_id, db_session)
    assert "Match" == str(excinfo.value)


@pytest.mark.parametrize(
    "user,coach,team,player,match,player_ids",
    [
        (
            user_create_unique_1,
            coach_create,
            team_create,
            player_create,
            match_create,
            [1],
        )
    ],
)
def test_correct__create_match_with_player_ids(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    player: PlayerCreate,
    match: MatchCreate,
    player_ids: list[int],
    db_session: Session,
) -> None:
    """Tests creating a match_player with a list of user ids.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        player (PlayerCreate): Player to be created.
        match (MatchCreate): Match to be created.
        player_ids (list[int]): A list of player_ids to be added to the match.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    create_new_player(player, db_session)
    new_match = create_match_with_player_ids(match, player_ids, db_session)
    assert new_match.notes == match.notes
    assert new_match.date == match.date
    assert new_match.has_started is False
    assert new_match.team.name == team.name
    if new_match.team.coach is not None:
        assert new_match.team.coach.date_of_birth == coach.date_of_birth
    assert new_match.players[0].date_of_birth == player.date_of_birth
    assert new_match.players[0].user.full_name == user.full_name


@pytest.mark.parametrize(
    "user,coach,team,player,match,player_ids",
    [
        (
            user_create_unique_1,
            coach_create,
            team_create,
            player_create,
            match_create,
            [1, 2],
        ),
        (
            user_create_unique_1,
            coach_create,
            team_create,
            player_create,
            match_create,
            [2, 3],
        ),
    ],
)
def test_incorrect__create_match_with_user_ids(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    player: PlayerCreate,
    match: MatchCreate,
    player_ids: list[int],
    db_session: Session,
) -> None:
    """Tests trying to create a match with a list of user ids.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        player (PlayerCreate): Player to be created.
        match (MatchCreate): Match to be created.
        player_ids (list[int]): A list of player_ids to be added to the match.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    create_new_player(player, db_session)
    with pytest.raises(MissingException):
        create_match_with_player_ids(match, player_ids, db_session)


@pytest.mark.parametrize(
    "user,coach,team,match,match_events",
    [
        (user_create_unique_1, coach_create, team_create, match_create, []),
        (
            user_create_unique_1,
            coach_create,
            team_create,
            match_create,
            [MatchEvent.START],
        ),
        (
            user_create_unique_1,
            coach_create,
            team_create,
            match_create,
            [MatchEvent.START, MatchEvent.END],
        ),
    ],
)
def test_correct__update_match_state(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    match: MatchCreate,
    match_events: list[MatchEvent],
    db_session: Session,
) -> None:
    """Tests updating match state.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        match (MatchCreate): Match to be created.
        match_events: list[MatchEvent],
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    new_match = create_new_match(match, db_session)
    for match_event in match_events:
        update_match_state(match_event, new_match.id, db_session)
    match_by_id = get_match_by_id(new_match.id, db_session)
    assert match_by_id.notes == match.notes
    assert match_by_id.date == match.date
    assert new_match.has_started is (MatchEvent.START in match_events)
    assert new_match.has_ended is (MatchEvent.END in match_events)
    if new_match.has_started:
        assert new_match.goals_scored == 0
        assert new_match.goals_conceded == 0
