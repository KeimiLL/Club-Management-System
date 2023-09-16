"""File for testing meeting CRUD operations."""


import pytest
from app.core.exceptions import MissingException
from app.crud.crud_meeting import create_new_meeting, get_meeting_by_id
from app.crud.crud_user import create_new_user
from app.schemas.meeting import MeetingCreate
from app.schemas.user import UserCreate
from app.tests.conftest import meeting_create, user_create_unique_1
from sqlalchemy.orm import Session


@pytest.mark.parametrize(
    "user,meeting",
    [(user_create_unique_1, meeting_create)],
)
def test_correct__create_new_meeting(
    user: UserCreate,
    meeting: MeetingCreate,
    db_session: Session,
) -> None:
    """Tests creating a meeting.

    Args:
        user (UserCreate): User to be created.
        meeting (MeetingCreate): Meeting to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    new_meeting = create_new_meeting(meeting, db_session)
    assert new_meeting.name == meeting.name
    assert new_meeting.notes == meeting.notes
    assert new_meeting.date == meeting.date


@pytest.mark.parametrize(
    "user,meeting",
    [(user_create_unique_1, meeting_create)],
)
def test_correct__get_meeting_by_id(
    user: UserCreate,
    meeting: MeetingCreate,
    db_session: Session,
) -> None:
    """Tests getting a meeting by id.

    Args:
        user (UserCreate): User to be created.
        meeting (MeetingCreate): Meeting to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    new_meeting = create_new_meeting(meeting, db_session)
    meeting_by_id = get_meeting_by_id(new_meeting.id, db_session)
    assert meeting_by_id.name == meeting.name
    assert meeting_by_id.notes == meeting.notes
    assert meeting_by_id.date == meeting.date


@pytest.mark.parametrize(
    "meeting_id",
    [0, 1000000],
)
def test_missing__get_meeting_by_id(
    meeting_id: int,
    db_session: Session,
) -> None:
    """Tests getting a missing meeting by id.

    Args:
        meeting_id (int): Meeting id to be read.
        db_session (Session): Database session.
    """
    with pytest.raises(MissingException) as excinfo:
        get_meeting_by_id(meeting_id, db_session)
    assert "Meeting" == str(excinfo.value)
