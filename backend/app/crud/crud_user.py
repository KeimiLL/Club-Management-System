"""File responsible for implementing users related CRUD operations."""


from typing import Optional

from app.core.security import Hasher
from app.models.user import User
from app.schemas.enums import Roles
from app.schemas.user import UserCreate, UserCreateWithRole
from sqlalchemy.orm import Session


def create_new_user(user: UserCreate | UserCreateWithRole, db: Session) -> User:
    """Creates a new user based on user data.

    Args:
        user (UserCreate): User based on User schema.
        db (Session): Database session.

    Returns:
        user (User): User object.
    """
    new_user = User(
        full_name=user.full_name,
        email=user.email,
        hashed_password=Hasher.get_password_hash(user.password),
        role=user.role if isinstance(user, UserCreateWithRole) else Roles.VIEWER,
    )  # type: ignore
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def get_user_by_email(email: str, db: Session) -> Optional[User]:
    """Gets the user based on the given email.

    Args:
        email (str): User email.
        db (Session): Database session.

    Returns:
        user (User): User object.
    """
    return db.query(User).filter(User.email == email).first()
