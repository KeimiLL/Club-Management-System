"""File for testing players CRUD operations."""


import pytest
from app.core.exceptions import MissingException
from app.crud.crud_coach import create_new_coach
from app.crud.crud_player import create_new_player, get_player_by_user_id
from app.crud.crud_team import create_new_team
from app.crud.crud_user import create_new_user
from app.schemas.coach import CoachCreate
from app.schemas.player import PlayerCreate
from app.schemas.team import TeamCreate
from app.schemas.user import UserCreate
from app.tests.conftest import (
    coach_create,
    player_create,
    team_create,
    user_create_unique_1,
)
from sqlalchemy.orm import Session


@pytest.mark.parametrize(
    "user,coach,team,player",
    [(user_create_unique_1, coach_create, team_create, player_create)],
)
def test_correct__create_new_player(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    player: PlayerCreate,
    db_session: Session,
) -> None:
    """Tests creating a player.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        player (PlayerCreate): Player to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    new_player = create_new_player(player, db_session)
    assert new_player.user.full_name == user.full_name
    if new_player.team is not None:
        assert new_player.team.name == team.name
        if new_player.team.coach is not None:
            assert new_player.team.coach.date_of_birth == coach.date_of_birth
    assert new_player.date_of_birth == player.date_of_birth


@pytest.mark.parametrize(
    "user,coach,team,player",
    [(user_create_unique_1, coach_create, team_create, player_create)],
)
def test_correct__get_player_by_user_id(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    player: PlayerCreate,
    db_session: Session,
) -> None:
    """Tests getting a player by user id.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        player (PlayerCreate): Player to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    new_player = create_new_player(player, db_session)
    player_by_user_id = get_player_by_user_id(new_player.user_id, db_session)
    assert player_by_user_id.user.full_name == user.full_name
    if player_by_user_id.team is not None:
        assert player_by_user_id.team.name == team.name
        if player_by_user_id.team.coach is not None:
            assert player_by_user_id.team.coach.date_of_birth == coach.date_of_birth
    assert player_by_user_id.date_of_birth == player.date_of_birth


@pytest.mark.parametrize(
    "user_id",
    [0, 1000000],
)
def test_incorrect__get_player_by_user_id(
    user_id: int,
    db_session: Session,
) -> None:
    """Tests getting a missing player by user id.

    Args:
        user_id (int): User id to be read.
        db_session (Session): Database session.
    """
    with pytest.raises(MissingException) as excinfo:
        get_player_by_user_id(user_id, db_session)
    assert "Player" == str(excinfo.value)
