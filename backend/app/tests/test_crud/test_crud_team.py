"""File for testing teams CRUD operations."""


import pytest
from app.core.exceptions import MissingException
from app.crud.crud_coach import create_new_coach
from app.crud.crud_team import create_new_team, get_all_teams, get_team_by_id
from app.crud.crud_user import create_new_user
from app.schemas.coach import CoachCreate
from app.schemas.team import TeamCreate
from app.schemas.user import UserCreate
from app.tests.conftest import coach_create, team_create, user_create_unique_1
from sqlalchemy.orm import Session


@pytest.mark.parametrize(
    "user,coach,team",
    [(user_create_unique_1, coach_create, team_create)],
)
def test_correct__create_new_team(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    db_session: Session,
) -> None:
    """Tests creating a team.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    new_team = create_new_team(team, db_session)
    assert new_team.coach.user.full_name == user.full_name
    assert new_team.coach.date_of_birth == coach.date_of_birth
    assert new_team.name == team.name


@pytest.mark.parametrize(
    "user,coach,team",
    [(user_create_unique_1, coach_create, team_create)],
)
def test_correct__get_team_by_id(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    db_session: Session,
) -> None:
    """Tests getting a team by id.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    new_team = create_new_team(team, db_session)
    team_by_id = get_team_by_id(new_team.id, db_session)
    assert team_by_id.coach.user.full_name == user.full_name
    assert team_by_id.coach.date_of_birth == coach.date_of_birth
    assert team_by_id.name == team.name


@pytest.mark.parametrize(
    "team_id",
    [0, 1000000],
)
def test_incorrect__get_team_by_id(
    team_id: int,
    db_session: Session,
) -> None:
    """Tests getting a missing team by id.

    Args:
        team_id (int): Team id to be read.
        db_session (Session): Database session.
    """
    with pytest.raises(MissingException) as excinfo:
        get_team_by_id(team_id, db_session)
    assert "Team" == str(excinfo.value)


@pytest.mark.parametrize(
    "user,coach,teams",
    [
        (user_create_unique_1, coach_create, []),
        (user_create_unique_1, coach_create, [team_create]),
    ],
)
def test_correct__get_all_teams(
    user: UserCreate,
    coach: CoachCreate,
    teams: list[TeamCreate],
    db_session: Session,
) -> None:
    """Tests getting all teams.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        teams (list[TeamCreate]): Teams to be created and read.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    for team in teams:
        create_new_team(team, db_session)
    new_teams = get_all_teams(db_session)
    assert len(teams) == len(new_teams)
    assert all((team.name == new_team.name for team, new_team in zip(teams, new_teams)))
