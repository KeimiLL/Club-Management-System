"""File for testing meeting_users CRUD operations."""


import pytest
from app.core.exceptions import MissingException
from app.crud.crud_meeting import create_new_meeting
from app.crud.crud_meeting_user import create_new_meeting_user, get_meeting_user_by_id
from app.crud.crud_user import create_new_user
from app.schemas.meeting import MeetingCreate
from app.schemas.meeting_user import MeetingUserCreate
from app.schemas.user import UserCreate
from app.tests.conftest import meeting_create, user_create_unique_1
from sqlalchemy.orm import Session


@pytest.mark.parametrize(
    "user,meeting",
    [(user_create_unique_1, meeting_create)],
)
def test_correct__create_new_meeting_user(
    user: UserCreate,
    meeting: MeetingCreate,
    db_session: Session,
) -> None:
    """Tests creating a meeting_user.

    Args:
        user (UserCreate): User to be created.
        meeting (MeetingCreate): Meeting to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_meeting(meeting, db_session)
    new_meeting_user = create_new_meeting_user(
        MeetingUserCreate(meeting_id=1, user_id=1), db_session
    )
    assert new_meeting_user.user.full_name == user.full_name
    assert new_meeting_user.meeting.name == meeting.name


@pytest.mark.parametrize(
    "user,meeting",
    [(user_create_unique_1, meeting_create)],
)
def test_correct__get_meeting_user_by_id(
    user: UserCreate,
    meeting: MeetingCreate,
    db_session: Session,
) -> None:
    """Tests getting a meeting_user by id.

    Args:
        user (UserCreate): User to be created.
        meeting (MeetingCreate): Meeting to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_meeting(meeting, db_session)
    new_meeting_user = create_new_meeting_user(
        MeetingUserCreate(meeting_id=1, user_id=1), db_session
    )
    meeting_user_by_id = get_meeting_user_by_id(new_meeting_user.id, db_session)
    assert meeting_user_by_id.user.full_name == new_meeting_user.user.full_name
    assert meeting_user_by_id.meeting.name == new_meeting_user.meeting.name


@pytest.mark.parametrize(
    "meeting_user_id",
    [0, 1000000],
)
def test_incorrect__get_meeting_user_by_id(
    meeting_user_id: int,
    db_session: Session,
) -> None:
    """Tests getting a missing meeting_user by id.

    Args:
        meeting_user_id (int): MeetingUser id to be read.
        db_session (Session): Database session.
    """
    with pytest.raises(MissingException) as excinfo:
        get_meeting_user_by_id(meeting_user_id, db_session)
    assert "MeetingUser" == str(excinfo.value)
