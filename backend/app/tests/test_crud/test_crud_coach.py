"""File for testing coaches CRUD operations."""


import pytest
from app.core.exceptions import MissingException
from app.crud.crud_coach import (
    create_new_coach,
    get_all_coaches,
    get_coach_by_team_id,
    get_coach_by_user_id,
)
from app.crud.crud_team import create_new_team
from app.crud.crud_user import create_new_user
from app.schemas.coach import CoachCreate
from app.schemas.team import TeamCreate
from app.schemas.user import UserCreate, UserCreateWithRole
from app.tests.conftest import (
    coach_create,
    team_create,
    user_create_unique_1,
    user_create_unique_2,
    user_create_with_role,
)
from sqlalchemy.orm import Session


@pytest.mark.parametrize(
    "user,coach",
    [(user_create_unique_1, coach_create)],
)
def test_correct__create_new_coach(
    user: UserCreate,
    coach: CoachCreate,
    db_session: Session,
) -> None:
    """Tests creating a coach.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    new_coach = create_new_coach(coach, db_session)
    assert new_coach.user.full_name == user.full_name
    assert new_coach.date_of_birth == coach.date_of_birth
    assert new_coach.date_of_joining == coach.date_of_joining


@pytest.mark.parametrize(
    "user,coach",
    [(user_create_unique_1, coach_create)],
)
def test_correct__get_coach_by_user_id(
    user: UserCreate,
    coach: CoachCreate,
    db_session: Session,
) -> None:
    """Tests getting a coach by user id.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    new_coach = create_new_coach(coach, db_session)
    coach_user_by_id = get_coach_by_user_id(new_coach.user_id, db_session)
    assert coach_user_by_id.user.full_name == user.full_name
    assert coach_user_by_id.date_of_birth == coach.date_of_birth
    assert coach_user_by_id.date_of_joining == coach.date_of_joining


@pytest.mark.parametrize(
    "user_id",
    [0, 1000000],
)
def test_incorrect__get_coach_by_user_id(
    user_id: int,
    db_session: Session,
) -> None:
    """Tests getting a missing coach by user id.

    Args:
        user_id (int): User id to be read.
        db_session (Session): Database session.
    """
    with pytest.raises(MissingException) as excinfo:
        get_coach_by_user_id(user_id, db_session)
    assert "Coach" == str(excinfo.value)


@pytest.mark.parametrize(
    "users,coaches",
    [
        ([user_create_unique_1], []),
        ([user_create_unique_1], [coach_create]),
        (
            [user_create_unique_1, user_create_unique_2, user_create_with_role],
            [coach_create, coach_create, coach_create],
        ),
    ],
)
def test_correct__get_all_coaches(
    users: list[UserCreate | UserCreateWithRole],
    coaches: list[CoachCreate],
    db_session: Session,
) -> None:
    """Tests getting all coaches.

    Args:
        users (list[UserCreate | UserCreateWithRole]): Users to be created.
        coaches (list[CoachCreate]): Coaches to be created and read.
        db_session (Session): Database session.
    """
    for user in users:
        create_new_user(user, db_session)
    for index, coach in enumerate(coaches):
        create_new_coach(coach.model_copy(update={"user_id": index + 1}), db_session)
    new_coaches = get_all_coaches(db_session)
    assert len(coaches) == len(new_coaches)
    assert all(
        (
            coach.date_of_birth == new_coach.date_of_birth
            for coach, new_coach in zip(coaches, new_coaches)
        )
    )


@pytest.mark.parametrize(
    "user,coach,team,coach_id",
    [
        (user_create_unique_1, coach_create, team_create, 1),
        (user_create_unique_1, coach_create, team_create, None),
    ],
)
def test_correct__get_coach_by_team_id(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    coach_id: int | None,
    db_session: Session,
) -> None:
    """Tests getting a coach by team id.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        coach_id (int | None): Coach id to be assigned to the team.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    new_coach = create_new_coach(coach, db_session)
    new_team = create_new_team(
        team.model_copy(update={"coach_id": coach_id}), db_session
    )
    coach_by_team_id = get_coach_by_team_id(new_team.id, db_session)
    if coach_by_team_id is not None:
        assert new_coach.user.full_name == coach_by_team_id.user.full_name
        assert new_coach.date_of_birth == coach_by_team_id.date_of_birth
        assert new_coach.date_of_joining == coach_by_team_id.date_of_joining
    else:
        assert coach_id is None
