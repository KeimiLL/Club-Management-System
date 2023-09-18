"""File responsible for implementing meetinges related CRUD operations."""


from app.core.exceptions import DuplicateException, MissingException
from app.crud.crud_user import get_user_by_id
from app.models.meeting import Meeting
from app.schemas.meeting import MeetingCreate
from sqlalchemy.exc import IntegrityError, NoResultFound, SQLAlchemyError
from sqlalchemy.orm import Session


def create_new_meeting(meeting: MeetingCreate, db: Session) -> Meeting:
    """Creates a new meeting based on meeting data.

    Args:
        meeting (MeetingCreate): Meeting based on Meeting schema.
        db (Session): Database session.

    Raises:
        DuplicateException: If there is already a meeting with the given id.
        SQLAlchemyError: If there is a database error.

    Returns:
        new_meeting (Meeting): Meeting object.
    """
    try:
        get_user_by_id(meeting.user_id, db)
        new_meeting = Meeting(
            user_id=meeting.user_id,
            name=meeting.name,
            notes=meeting.notes,
            date=meeting.date,
        )
        db.add(new_meeting)
        db.commit()
        db.refresh(new_meeting)
        return new_meeting
    except IntegrityError as exc:
        raise DuplicateException(Meeting.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def get_meeting_by_id(meeting_id: int, db: Session) -> Meeting:
    """Gets the meeting based on the given meeting id.

    Args:
        meeting_id (int): Meeting id.
        db (Session): Database session.

    Raises:
        MissingException: If no meeting matches the given meeting id.
        SQLAlchemyError: If there is a database error.

    Returns:
        Meeting: Meeting object.
    """
    try:
        return db.query(Meeting).filter(Meeting.id == meeting_id).one()
    except NoResultFound as exc:
        raise MissingException(Meeting.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc
