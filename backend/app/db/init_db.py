"""File for initializing database with data."""


from app.core.config import get_settings
from app.core.exceptions import MissingException
from app.crud.crud_user import create_new_user, get_user_by_email
from app.db import base  # pylint: disable=unused-import
from app.schemas.enums import Roles
from app.schemas.user import UserCreateWithRole
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session


def init_db(db: Session) -> None:
    """Creates users with different roles in the database.

    Args:
        db (Session): Database session.
    """
    try:
        get_user_by_email(get_settings().SUPER_USER_EMAIL, db)
    except (MissingException, SQLAlchemyError):
        create_new_user(
            UserCreateWithRole(
                full_name=get_settings().SUPER_USER_FULL_NAME,
                email=get_settings().SUPER_USER_EMAIL,
                password=get_settings().SUPER_USER_PASSWORD,
                role=Roles.ADMIN,
            ),
            db,
        )

    try:
        get_user_by_email(get_settings().DEV_VIEWER_EMAIL, db)
    except (MissingException, SQLAlchemyError):
        create_new_user(
            UserCreateWithRole(
                full_name=get_settings().DEV_VIEWER_FULL_NAME,
                email=get_settings().DEV_VIEWER_EMAIL,
                password=get_settings().DEV_VIEWER_PASSWORD,
                role=Roles.VIEWER,
            ),
            db,
        )

    try:
        get_user_by_email(get_settings().DEV_NONE_EMAIL, db)
    except (MissingException, SQLAlchemyError):
        create_new_user(
            UserCreateWithRole(
                full_name=get_settings().DEV_NONE_FULL_NAME,
                email=get_settings().DEV_NONE_EMAIL,
                password=get_settings().DEV_NONE_PASSWORD,
                role=Roles.NONE,
            ),
            db,
        )
