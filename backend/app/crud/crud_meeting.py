"""File responsible for implementing meetinges related CRUD operations."""


from app.core.exceptions import DuplicateException, MissingException
from app.crud.crud_user import get_user_by_id
from app.models.meeting import Meeting
from app.models.meeting_user import MeetingUser
from app.schemas.meeting import MeetingCreate
from sqlalchemy import or_
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


def get_all_meetings(
    page: int,
    per_page: int,
    db: Session,
) -> list[Meeting]:
    """Gets all meetings with pagination.

    Args:
        page (int): The current page number.
        per_page (int): The number of items per page.
        db (Session): Database session.

    Raises:
        SQLAlchemyError: If there is a database error.

    Returns:
        list[Meeting]: _description_
    """
    try:
        return (
            db.query(Meeting)
            .order_by(Meeting.date)
            .offset(page * per_page)
            .limit(per_page)
            .all()
        )
    except SQLAlchemyError as exc:
        raise exc


def get_meetings_by_user_id(
    page: int, per_page: int, user_id: int, db: Session
) -> list[Meeting]:
    """Gets all meetings that were either created by the current user or the current user
        is part of their attendance.

    Args:
        page (int): The current page number.
        per_page (int): The number of items per page.
        user_id (int): The current user's id.
        db (Session): Database session.

    Raises:
        SQLAlchemyError: If there is a database error.

    Returns:
        list[Meeting]: The filtered list of meetings.
    """
    try:
        return (
            db.query(Meeting)
            .join(MeetingUser)
            .filter(or_(MeetingUser.user_id == user_id, Meeting.user_id == user_id))
            .order_by(Meeting.date)
            .offset(page * per_page)
            .limit(per_page)
            .all()
        )
    except SQLAlchemyError as exc:
        raise exc
