"""File responsible for implementing users related CRUD operations."""


from app.core.exceptions import DuplicateException, MissingException
from app.core.security import Hasher
from app.models.user import User
from app.schemas.enums import Roles
from app.schemas.user import UserCreate, UserCreateWithRole, UserInDB
from sqlalchemy.exc import IntegrityError, NoResultFound, SQLAlchemyError
from sqlalchemy.orm import Session


def create_new_user(user: UserCreate | UserCreateWithRole, db: Session) -> User:
    """Creates a new user based on user data.

    Args:
        user (UserCreate | UserCreateWithRole): User based on User schema.
        db (Session): Database session.

    Raises:
        DuplicateException: If there is already a user with the given email.
        SQLAlchemyError: If there is a different exception.

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


def get_user_by_email(email: str, db: Session) -> UserInDB:
    """Gets the user based on the given email.

    Args:
        email (str): User email.
        db (Session): Database session.

    Raises:
        MissingException: If no user matches the given email.
        SQLAlchemyError: If there is a different exception.

    Returns:
        UserInDB: User object.
    """
    try:
        return db.query(User).filter(User.email == email).one()
    except NoResultFound as exc:
        raise MissingException(User.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc
