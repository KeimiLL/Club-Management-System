"""File responsible for implementing meeting_useres related CRUD operations."""


from app.core.exceptions import DuplicateException, MissingException
from app.crud.crud_meeting import get_meeting_by_id
from app.crud.crud_user import get_user_by_id
from app.models.meeting_user import MeetingUser
from app.schemas.meeting_user import MeetingUserCreate
from sqlalchemy.exc import IntegrityError, NoResultFound, SQLAlchemyError
from sqlalchemy.orm import Session


def create_new_meeting_user(
    meeting_user: MeetingUserCreate, db: Session
) -> MeetingUser:
    """Creates a new meeting_user based on meeting_user data.

    Args:
        meeting_user (MeetingUserCreate): MeetingUser based on MeetingUser schema.
        db (Session): Database session.

    Raises:
        DuplicateException: If there is already a meeting_user with the given user id.
        SQLAlchemyError: If there is a database error.

    Returns:
        new_meeting_user (MeetingUser): MeetingUser object.
    """
    try:
        get_meeting_by_id(meeting_user.meeting_id, db)
        get_user_by_id(meeting_user.user_id, db)
        new_meeting_user = MeetingUser(
            meeting_id=meeting_user.meeting_id,
            user_id=meeting_user.user_id,
        )
        db.add(new_meeting_user)
        db.commit()
        db.refresh(new_meeting_user)
        return new_meeting_user
    except IntegrityError as exc:
        raise DuplicateException(MeetingUser.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def get_meeting_user_by_id(meeting_user_id: int, db: Session) -> MeetingUser:
    """Gets the meeting_user based on the given meeting_user id.

    Args:
        meeting_user_id (int): MeetingUser id.
        db (Session): Database session.

    Raises:
        MissingException: If no meeting_user matches the given meeting_user id.
        SQLAlchemyError: If there is a database error.

    Returns:
        MeetingUser: MeetingUser object.
    """
    try:
        return db.query(MeetingUser).filter(MeetingUser.id == meeting_user_id).one()
    except NoResultFound as exc:
        raise MissingException(MeetingUser.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc
