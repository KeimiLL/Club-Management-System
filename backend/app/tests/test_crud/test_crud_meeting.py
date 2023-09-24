"""File for testing meeting CRUD operations."""


import pytest
from app.core.exceptions import MissingException
from app.crud.crud_meeting import (
    create_new_meeting,
    get_all_meetings,
    get_meeting_by_id,
    get_meetings_by_user_id,
)
from app.crud.crud_user import create_new_user
from app.schemas.meeting import MeetingCreate
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


@pytest.mark.parametrize(
    "user,meeting,page,per_page,total",
    [
        (user_create_unique_1, meeting_create, 0, 1, 1),
        (user_create_unique_1, meeting_create, 0, 2, 2),
        (user_create_unique_1, meeting_create, 1, 1, 3),
        (user_create_unique_1, meeting_create, 1, 2, 3),
        (user_create_unique_1, meeting_create, 2, 1, 3),
    ],
)
def test_correct__get_all_meetings(
    user: UserCreate,
    meeting: MeetingCreate,
    page: int,
    per_page: int,
    total: int,
    db_session: Session,
) -> None:
    """Tests getting all meetings.

    Args:
        user (UserCreate): User to be created.
        meeting (MeetingCreate): Meeting to be created.
        page (int): The page index to be retrieved.
        per_page (int): The number of items per page.
        total (int): The total number of items.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    new_meetings = [create_new_meeting(meeting, db_session) for _ in range(total)]
    all_meetings, created_total = get_all_meetings(page, per_page, db_session)
    assert total == created_total
    for index, new_meeting in enumerate(new_meetings):
        if page * per_page <= index < page * per_page + per_page:
            assert all_meetings[index - page * per_page] == new_meeting


@pytest.mark.parametrize(
    "users,meeting,page,per_page,user_ids",
    [
        ([user_create_unique_1], meeting_create, 0, 1, [1, 1]),
        ([user_create_unique_1, user_create_unique_2], meeting_create, 0, 2, [1, 2]),
        (
            [user_create_unique_1, user_create_unique_2],
            meeting_create,
            1,
            1,
            [1, 2, 1],
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            meeting_create,
            1,
            2,
            [1, 2, 2],
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            meeting_create,
            2,
            1,
            [1, 2, 2],
        ),
    ],
)
def test_correct__get_meetings_by_user_id(
    users: list[UserCreate],
    meeting: MeetingCreate,
    page: int,
    per_page: int,
    user_ids: list[int],
    db_session: Session,
) -> None:
    """Tests getting all meetings that meet the filtering criteria.

    Args:
        users (list[UserCreate]): Users to be created.
        meeting (MeetingCreate): Meeting to be created.
        page (int): The page index to be retrieved.
        per_page (int): The number of items per page.
        user_ids (list[int]): The user ids to read .
        db_session (Session): Database session.
    """
    for user in users:
        create_new_user(user, db_session)
    new_meetings = [
        create_new_meeting(
            MeetingCreate(
                notes=meeting.notes,
                name=meeting.name,
                date=meeting.date,
                user_id=user_id,
            ),
            db_session,
        )
        for user_id in user_ids
    ]
    for user_id in set(user_ids):
        all_meetings, new_total = get_meetings_by_user_id(
            page, per_page, user_id, db_session
        )
        assert new_total == sum(u == user_id for u in user_ids)
        for index, new_meeting in enumerate(
            [m for m in new_meetings if m.user_id == user_id]
        ):
            if page * per_page <= index < page * per_page + per_page:
                assert all_meetings[index - page * per_page] == new_meeting
