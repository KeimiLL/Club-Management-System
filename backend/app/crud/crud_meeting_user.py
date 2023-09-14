"""File responsible for implementing meeting_useres related CRUD operations."""


from app.core.exceptions import (
    GenericException,
    MissingAssociationObjectException,
    MissingException,
)
from app.crud.crud_meeting import create_new_meeting
from app.models.meeting import Meeting
from app.models.meeting_user import MeetingUser
from app.models.user import User
from app.schemas.meeting import MeetingCreate
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
        return db.query(MeetingUser).filter(MeetingUser.id == meeting_user_id).one()
    except NoResultFound as exc:
        raise MissingException(MeetingUser.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def create_meeting_user_from_user_id_list(
    meeting: MeetingCreate, user_ids: list[int], db: Session
) -> Meeting:
    """Creates a new meeting_user based on meeting data and a list of user ids.

    Args:
        meeting (MeetingCreate): Meeting based on Meeting schema.
        user_ids (list[int]): User ids to be added.
        db (Session): Database session.

    Raises:
        GenericException: If any of the provided user ids matches the current user id.
        MissingException: If any of the provided user ids does not match an existing user.
        SQLAlchemyError: If there is a database error.

    Returns:
        Meeting: The created meeting.
    """
    try:
        if meeting.user_id in user_ids:
            raise GenericException(
                "The list of user ids cannot contain the creator's id."
            )
        users = db.query(User).filter(User.id.in_(user_ids)).all()
        if not users or len(users) != len(user_ids):
            raise MissingException(User.__name__)
        new_meeting = create_new_meeting(
            meeting=meeting,
            db=db,
        )
        meetings_users = []
        for user in users:
            new_meeting_user = MeetingUser()
            new_meeting_user.user = user
            new_meeting_user.meeting = new_meeting
            meetings_users.append(new_meeting_user)
        db.add_all(meetings_users)
        db.commit()
        db.refresh(new_meeting)
        return new_meeting
    except SQLAlchemyError as exc:
        raise exc
