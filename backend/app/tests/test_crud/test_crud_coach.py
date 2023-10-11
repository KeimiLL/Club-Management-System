"""File for testing coaches CRUD operations."""


import pytest
from app.core.exceptions import MissingException
from app.crud.crud_coach import create_new_coach, get_coach_by_user_id
from app.crud.crud_user import create_new_user
from app.schemas.coach import CoachCreate
from app.schemas.user import UserCreate
from app.tests.conftest import coach_create, user_create_unique_1
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
