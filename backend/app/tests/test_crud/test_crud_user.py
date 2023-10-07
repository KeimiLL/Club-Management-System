"""File for testing user CRUD operations."""


import pytest
from app.core.exceptions import DuplicateException, MissingException
from app.crud.crud_user import (
    create_new_user,
    get_all_users,
    get_user_by_email,
    get_user_by_id,
)
from app.schemas.enums import Roles
from app.schemas.user import UserCreate, UserCreateWithRole
from app.tests.conftest import (
    user_create_unique_1,
    user_create_unique_2,
    user_create_with_role,
)
from sqlalchemy.orm import Session


@pytest.mark.parametrize(
    "user",
    [user_create_unique_1, user_create_with_role],
)
def test_correct__create_new_user(
    user: UserCreate | UserCreateWithRole,
    db_session: Session,
) -> None:
    """Tests creating a user.

    Args:
        user (UserCreate | UserCreateWithRole): User to be created.
        db_session (Session): Database session.
    """
    new_user = create_new_user(user, db_session)
    assert new_user.full_name == user.full_name
    assert new_user.email == user.email
    assert (
        new_user.role == user.role
        if isinstance(user, UserCreateWithRole)
        else Roles.VIEWER
    )


@pytest.mark.parametrize(
    "user",
    [user_create_unique_1, user_create_with_role],
)
def test_duplicate__create_new_user(
    user: UserCreate | UserCreateWithRole,
    db_session: Session,
) -> None:
    """Tests creating a duplicate user.

    Args:
        user (UserCreate | UserCreateWithRole): User to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    with pytest.raises(DuplicateException) as excinfo:
        create_new_user(user, db_session)
    assert "User" == str(excinfo.value)


@pytest.mark.parametrize(
    "user",
    [user_create_unique_1, user_create_with_role],
)
def test_correct__get_user_by_email(
    user: UserCreate | UserCreateWithRole,
    db_session: Session,
) -> None:
    """Tests getting an existing user by email.

    Args:
        user (UserCreate | UserCreateWithRole): User to be created and read.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    user_by_email = get_user_by_email(user.email, db_session)
    assert user_by_email.full_name == user.full_name
    assert user_by_email.email == user.email
    assert (
        user_by_email.role == user.role
        if isinstance(user, UserCreateWithRole)
        else Roles.VIEWER
    )
    assert hasattr(user_by_email, "hashed_password")


@pytest.mark.parametrize(
    "user",
    [user_create_unique_1, user_create_with_role],
)
def test_missing__get_user_by_email(
    user: UserCreate | UserCreateWithRole,
    db_session: Session,
) -> None:
    """Tests getting a missing user by email.

    Args:
        user (UserCreate | UserCreateWithRole): User to be tried to read.
        db_session (Session): Database session.
    """
    with pytest.raises(MissingException) as excinfo:
        get_user_by_email(user.email, db_session)
    assert "User" == str(excinfo.value)


@pytest.mark.parametrize(
    "user",
    [user_create_unique_1, user_create_with_role],
)
def test_correct__get_user_by_id(
    user: UserCreate | UserCreateWithRole,
    db_session: Session,
) -> None:
    """Tests getting an existing user by id.

    Args:
        user (UserCreate | UserCreateWithRole): User to be created and read.
        db_session (Session): Database session.
    """
    new_user = create_new_user(user, db_session)
    user_by_id = get_user_by_id(new_user.id, db_session)
    assert user_by_id.full_name == user.full_name
    assert user_by_id.email == user.email
    assert (
        user_by_id.role == user.role
        if isinstance(user, UserCreateWithRole)
        else Roles.VIEWER
    )
    assert hasattr(user_by_id, "hashed_password")


@pytest.mark.parametrize(
    "user_id",
    [0, 1000000],
)
def test_incorrect__get_user_by_id(
    user_id: int,
    db_session: Session,
) -> None:
    """Tests getting a missing user by id.

    Args:
        user_id (int): User id to be read.
        db_session (Session): Database session.
    """
    with pytest.raises(MissingException) as excinfo:
        get_user_by_id(user_id, db_session)
    assert "User" == str(excinfo.value)


@pytest.mark.parametrize(
    "users",
    [[], [user_create_unique_1], [user_create_unique_2, user_create_with_role]],
)
def test_correct__get_all_users(
    users: list[UserCreate | UserCreateWithRole],
    db_session: Session,
) -> None:
    """Tests getting all users.

    Args:
        users (list[UserCreate | UserCreateWithRole]): Users to be created and read.
        db_session (Session): Database session.
    """
    for user in users:
        create_new_user(user, db_session)
    new_users = get_all_users(db_session)
    assert len(users) == len(new_users)
    assert all(
        (user.email == new_user.email for user, new_user in zip(users, new_users))
    )
