"""File for testing user CRUD operations."""


import pytest
from app.core.config import get_settings
from app.core.exceptions import DuplicateException, MissingException
from app.crud.crud_user import create_new_user, get_user_by_email
from app.schemas.enums import Roles
from app.schemas.user import UserCreate, UserCreateWithRole
from sqlalchemy.orm import Session

user_create = UserCreate(
    full_name=get_settings().TEST_USER_FULL_NAME,
    email=get_settings().TEST_USER_EMAIL,
    password=get_settings().TEST_USER_PASSWORD,
)

user_create_with_role = UserCreateWithRole(
    full_name=get_settings().TEST_USER_FULL_NAME,
    email=get_settings().TEST_USER_EMAIL,
    password=get_settings().TEST_USER_PASSWORD,
    role=Roles.ADMIN,
)


@pytest.mark.parametrize(
    "user",
    [user_create, user_create_with_role],
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
    [user_create, user_create_with_role],
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
    [user_create, user_create_with_role],
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
    [user_create, user_create_with_role],
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
