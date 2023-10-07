"""File for testing meeting_users CRUD operations."""


import pytest
from app.core.exceptions import GenericException, MissingException
from app.crud.crud_meeting import create_new_meeting
from app.crud.crud_meeting_user import (
    create_meeting_user_from_user_id_list,
    create_new_meeting_user,
    get_meeting_user_by_id,
)
from app.crud.crud_user import create_new_user
from app.schemas.meeting import MeetingCreate
from app.schemas.meeting_user import MeetingUserCreate
from app.schemas.user import UserCreate
from app.tests.conftest import (
    meeting_create,
    user_create_unique_1,
    user_create_unique_2,
)
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


@pytest.mark.parametrize(
    "created_by,user,meeting,user_ids",
    [(user_create_unique_1, user_create_unique_2, meeting_create, [2])],
)
def test_correct__create_meeting_user_from_user_id_list(
    created_by: UserCreate,
    user: UserCreate,
    meeting: MeetingCreate,
    user_ids: list[int],
    db_session: Session,
) -> None:
    """Tests creating a meeting_user with a list of user ids.

    Args:
        created_by (UserCreate): User to be created that will be the creator of the meeting.
        user (UserCreate): User to be created.
        meeting (MeetingCreate): Meeting to be created.
        user_ids (list[int]): A list of user_ids to be added to the meeting.
        db_session (Session): Database session.
    """
    create_new_user(created_by, db_session)
    create_new_user(user, db_session)
    new_meeting = create_meeting_user_from_user_id_list(meeting, user_ids, db_session)
    assert new_meeting.created_by_user.full_name == created_by.full_name
    assert new_meeting.users[0].full_name == user.full_name
    assert new_meeting.users[0].meetings[0].name == meeting.name


@pytest.mark.parametrize(
    "created_by,user,meeting,user_ids,exception",
    [
        (
            user_create_unique_1,
            user_create_unique_2,
            meeting_create,
            [1],
            GenericException,
        ),
        (
            user_create_unique_1,
            user_create_unique_2,
            meeting_create,
            [2, 2],
            MissingException,
        ),
        (
            user_create_unique_1,
            user_create_unique_2,
            meeting_create,
            [2, 3],
            MissingException,
        ),
    ],
)
def test_incorrect__create_meeting_user_from_user_id_list(
    created_by: UserCreate,
    user: UserCreate,
    meeting: MeetingCreate,
    user_ids: list[int],
    exception: Exception,
    db_session: Session,
) -> None:
    """Tests creating a meeting_user with a set of user ids.

    Args:
        created_by (UserCreate): User to be created that will be the creator of the meeting.
        user (UserCreate): User to be created.
        meeting (MeetingCreate): Meeting to be created.
        user_ids (list[int]): A list of user_ids to be added to the meeting.
        exception (Exception): The exception that is going to be raised.
        db_session (Session): Database session.
    """
    create_new_user(created_by, db_session)
    create_new_user(user, db_session)
    with pytest.raises(exception):
        create_meeting_user_from_user_id_list(meeting, user_ids, db_session)
