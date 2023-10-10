"""File for testing user CRUD operations."""


import pytest
from app.core.exceptions import DuplicateException, MissingException
from app.crud.crud_user import (
    create_new_user,
    get_all_users,
    get_all_users_with_pagination,
    get_user_by_email,
    get_user_by_id,
    update_user_password,
    update_user_role,
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


@pytest.mark.parametrize(
    "users,roles",
    [
        ([user_create_unique_1], [Roles.ADMIN]),
        ([user_create_unique_2, user_create_with_role], [Roles.BOARD, Roles.COACH]),
    ],
)
def test_correct__update_user_role(
    users: list[UserCreate | UserCreateWithRole],
    roles: list[Roles],
    db_session: Session,
) -> None:
    """Tests updating user role.

    Args:
        users (list[UserCreate | UserCreateWithRole]): Users to be created and read.
        roles (list[Roles]): Users' roles to be set.
        db_session (Session): Database session.
    """
    for index, (user, role) in enumerate(zip(users, roles)):
        create_new_user(user, db_session)
        updated_user = update_user_role(index + 1, role, db_session)
        assert updated_user.full_name == user.full_name
        assert updated_user.role == role


@pytest.mark.parametrize(
    "users,passwords",
    [
        ([user_create_unique_1], ["CZ!T7WA9zWY8Wq2@"]),
        (
            [user_create_unique_2, user_create_with_role],
            ["Pqc3utP*L4i@V89j", "8rwuwKz9%AX%7zzA"],
        ),
    ],
)
def test_correct__update_user_password(
    users: list[UserCreate | UserCreateWithRole],
    passwords: list[str],
    db_session: Session,
) -> None:
    """Tests updating user password.

    Args:
        users (list[UserCreate | UserCreateWithRole]): Users to be created and read.
        passwords (list[str]): Users' passwords to be set.
        db_session (Session): Database session.
    """
    for index, (user, password) in enumerate(zip(users, passwords)):
        create_new_user(user, db_session)
        updated_user = update_user_password(index + 1, password, db_session)
        assert updated_user.full_name == user.full_name
        assert updated_user.hashed_password == password


@pytest.mark.parametrize(
    "users,page,per_page,total",
    [
        ([user_create_with_role], 0, 1, 1),
        ([user_create_with_role], 0, 1, 1),
        ([user_create_with_role, user_create_unique_1], 0, 2, 2),
        ([user_create_with_role, user_create_unique_1, user_create_unique_2], 1, 1, 3),
        ([user_create_with_role, user_create_unique_1, user_create_unique_2], 1, 2, 3),
        ([user_create_with_role, user_create_unique_1, user_create_unique_2], 2, 1, 3),
    ],
)
def test_correct__get_all_users_with_pagination(
    users: list[UserCreateWithRole | UserCreate],
    page: int,
    per_page: int,
    total: int,
    db_session: Session,
) -> None:
    """Tests getting all users with pagination.

    Args:
        users (list[UserCreateWithRole | UserCreate]): Users to be created.
        page (int): The page index to be retrieved.
        per_page (int): The number of items per page.
        total (int): The total number of items.
        db_session (Session): Database session.
    """
    new_users = [create_new_user(user, db_session) for user in users]
    all_users, created_total = get_all_users_with_pagination(page, per_page, db_session)
    assert total == created_total
    for index, new_user in enumerate(reversed(new_users)):
        if page * per_page <= index < page * per_page + per_page:
            assert all_users[index - page * per_page] == new_user
