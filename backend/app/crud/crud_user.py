"""File responsible for implementing users related CRUD operations."""


from typing import Sequence

from app.core.exceptions import DuplicateException, MissingException
from app.core.security import Hasher
from app.models.user import User
from app.schemas.enums import Roles
from app.schemas.user import UserCreate, UserCreateWithRole
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError, NoResultFound, SQLAlchemyError
from sqlalchemy.orm import Session


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


def get_all_users(db: Session) -> Sequence[User]:
    """Gets all users.

    Args:
        db (Session): Database session.

    Raises:
        SQLAlchemyError: If there is a database error.

    Returns:
        Sequence[User]: A list of all User objects.
    """
    try:
        return db.scalars(select(User)).all()
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
        user.role = role
        db.commit()
        return user
    except NoResultFound as exc:
        raise MissingException(User.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc
