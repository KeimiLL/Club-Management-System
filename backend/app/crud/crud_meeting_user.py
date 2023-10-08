"""File responsible for implementing meeting_users related CRUD operations."""


from app.core.exceptions import MissingAssociationObjectException, MissingException
from app.models.meeting_user import MeetingUser
from app.schemas.meeting_user import MeetingUserCreate
from sqlalchemy import select
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
        MissingAssociationObjectException: If there is an IntegrityError
            while creating the record.
        SQLAlchemyError: If there is a database error.

    Returns:
        new_meeting_user (MeetingUser): MeetingUser object.
    """
    try:
        new_meeting_user = MeetingUser(
            meeting_id=meeting_user.meeting_id,
            user_id=meeting_user.user_id,
        )
        db.add(new_meeting_user)
        db.commit()
        db.refresh(new_meeting_user)
        return new_meeting_user
    except IntegrityError as exc:
        raise MissingAssociationObjectException(MeetingUser.__name__) from exc
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
        return db.execute(
            select(MeetingUser).where(MeetingUser.id == meeting_user_id)
        ).scalar_one()
    except NoResultFound as exc:
        raise MissingException(MeetingUser.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc
