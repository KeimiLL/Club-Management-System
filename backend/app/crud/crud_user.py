"""File responsible for implementing users related CRUD operations."""


from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy.exc import NoResultFound, IntegrityError, SQLAlchemyError

from app.core.exceptions import MissingException, DuplicateException
from app.core.security import Hasher
from app.models.user import User
from app.schemas.enums import Roles
from app.schemas.user import UserCreate, UserCreateWithRole


def create_new_user(user: UserCreate | UserCreateWithRole, db: Session) -> User:
    """Creates a new user based on user data.

    Args:
        user (UserCreate): User based on User schema.
        db (Session): Database session.

    Returns:
        user (User): User object.
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


def get_user_by_email(email: str, db: Session) -> Optional[User]:
    """Gets the user based on the given email.

    Args:
        email (str): User email.
        db (Session): Database session.

    Returns:
        user (User): User object.
    """
    try:
        return db.query(User).filter(User.email == email).one()
    except NoResultFound as exc:
        raise MissingException(User.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc
