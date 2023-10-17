"""File responsible for implementing users related CRUD operations."""


from typing import Callable

from app.core.exceptions import DuplicateException, MissingException
from app.core.security import Hasher
from app.models.coach import Coach
from app.models.player import Player
from app.models.user import User
from app.schemas.enums import Roles
from app.schemas.user import UserCreate, UserCreateWithRole
from sqlalchemy import delete, func, select
from sqlalchemy.exc import IntegrityError, NoResultFound, SQLAlchemyError
from sqlalchemy.orm import Session

func: Callable


def create_new_user(user: UserCreate | UserCreateWithRole, db: Session) -> User:
    """Creates a new user based on user data.

    Args:
        user (UserCreate | UserCreateWithRole): User based on User schema.
        db (Session): Database session.

    Raises:
        DuplicateException: If there is already a user with the given email.
        SQLAlchemyError: If there is a database error.

    Returns:
        new_user (User): User object.
    """
    try:
        new_user = User(
            full_name=user.full_name,
            email=user.email,
            hashed_password=Hasher.get_password_hash(user.password),
            role=user.role if isinstance(user, UserCreateWithRole) else Roles.VIEWER,
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except IntegrityError as exc:
        raise DuplicateException(User.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def get_user_by_email(email: str, db: Session) -> User:
    """Gets the user based on the given email.

    Args:
        email (str): User email.
        db (Session): Database session.

    Raises:
        MissingException: If no user matches the given email.
        SQLAlchemyError: If there is a database error.

    Returns:
        User: User object.
    """
    try:
        return db.execute(select(User).where(User.email == email)).scalar_one()
    except NoResultFound as exc:
        raise MissingException(User.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def get_user_by_id(user_id: int, db: Session) -> User:
    """Gets the user based on the given id.

    Args:
        user_id (int): User id.
        db (Session): Database session.

    Raises:
        MissingException: If no user matches the given id.
        SQLAlchemyError: If there is a database error.

    Returns:
        User: User object.
    """
    try:
        return db.execute(select(User).where(User.id == user_id)).scalar_one()
    except NoResultFound as exc:
        raise MissingException(User.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def get_all_users(db: Session) -> list[User]:
    """Gets all users.

    Args:
        db (Session): Database session.

    Raises:
        SQLAlchemyError: If there is a database error.

    Returns:
        list[User]: A list of all User objects.
    """
    try:
        return list(db.scalars(select(User)).all())
    except SQLAlchemyError as exc:
        raise exc


def update_user_role(user_id: int, role: Roles, db: Session) -> User:
    """Selects the user with the given id and update its role.

    Args:
        user_id (int): User id.
        role (Roles): User role to be set.
        db (Session): Database session.

    Raises:
        MissingException: If no user matches the given id.
        SQLAlchemyError: If there is a database error.

    Returns:
        User: The updated user.
    """
    try:
        query = select(User).where(User.id == user_id)
        user = db.execute(query).scalar_one()
        if user.role == role:
            return user
        if user.role == Roles.COACH:
            query = delete(Coach).where(Coach.user_id == user_id)
            db.execute(query)
        elif user.role == Roles.PLAYER:
            query = delete(Player).where(Player.user_id == user_id)
            db.execute(query)
        user.role = role
        db.commit()
        return user
    except NoResultFound as exc:
        raise MissingException(User.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def update_user_password(user_id: int, new_hashed_password: str, db: Session) -> User:
    """Selects the user with the given id and update its role.

    Args:
        user_id (int): User id.
        new_hashed_password (str): User hashed password to be set.
        db (Session): Database session.

    Raises:
        MissingException: If no user matches the given id.
        SQLAlchemyError: If there is a database error.

    Returns:
        User: The updated user.
    """
    try:
        query = select(User).where(User.id == user_id)
        user = db.execute(query).scalar_one()
        user.hashed_password = new_hashed_password
        db.commit()
        return user
    except NoResultFound as exc:
        raise MissingException(User.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def get_all_users_with_pagination(
    page: int,
    per_page: int,
    db: Session,
) -> tuple[list[User], int]:
    """Gets and optionally paginates all users.

    Args:
        page (int): The current page number.
        per_page (int): The number of items per page.
        db (Session): Database session.

    Raises:
        SQLAlchemyError: If there is a database error.

    Returns:
        tuple[list[User], int: The list of all meetings alongside the total number of them.
    """
    try:
        query = select(User)
        total = db.scalar(select(func.count()).select_from(query))
        return (
            list(
                db.scalars(
                    query.order_by(User.id.desc())
                    .offset(page * per_page)
                    .limit(per_page)
                ).all()
            ),
            total,
        )
    except SQLAlchemyError as exc:
        raise exc
