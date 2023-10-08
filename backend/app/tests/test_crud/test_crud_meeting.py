"""File for testing meeting CRUD operations."""


import pytest
from app.core.exceptions import GenericException, MissingException
from app.crud.crud_meeting import (
    create_meeting_with_user_ids,
    create_new_meeting,
    get_all_meetings,
    get_meeting_by_id,
    get_meetings_by_user_id,
    update_meeting_with_user_ids,
)
from app.crud.crud_user import create_new_user
from app.schemas.meeting import MeetingCreate, MeetingUpdate
from app.schemas.user import UserCreate
from app.tests.conftest import (
    meeting_create,
    meeting_update,
    user_create_unique_1,
    user_create_unique_2,
    user_create_with_role,
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
def test_incorrect__get_meeting_by_id(
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
    for index, new_meeting in enumerate(reversed(new_meetings)):
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
            reversed([m for m in new_meetings if m.user_id == user_id])
        ):
            if page * per_page <= index < page * per_page + per_page:
                assert all_meetings[index - page * per_page] == new_meeting


@pytest.mark.parametrize(
    "created_by,user,meeting,user_ids",
    [(user_create_unique_1, user_create_unique_2, meeting_create, [2])],
)
def test_correct__create_meeting_with_user_ids(
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
    new_meeting = create_meeting_with_user_ids(meeting, user_ids, db_session)
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
def test_incorrect__create_meeting_with_user_ids(
    created_by: UserCreate,
    user: UserCreate,
    meeting: MeetingCreate,
    user_ids: list[int],
    exception: Exception,
    db_session: Session,
) -> None:
    """Tests creating a meeting with a set of user ids.

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
        create_meeting_with_user_ids(meeting, user_ids, db_session)


@pytest.mark.parametrize(
    "users,meeting,meeting_id,meeting_data,user_ids",
    [
        (
            [user_create_unique_1, user_create_unique_2],
            meeting_create,
            1,
            meeting_update,
            [2],
        ),
        (
            [user_create_unique_1, user_create_unique_2, user_create_with_role],
            meeting_create,
            1,
            meeting_update,
            [3],
        ),
        (
            [user_create_unique_1, user_create_unique_2, user_create_with_role],
            meeting_create,
            1,
            meeting_update,
            [2, 3],
        ),
    ],
)
def test_correct__update_meeting_with_user_ids(
    users: list[UserCreate],
    meeting: MeetingCreate,
    meeting_id: int,
    meeting_data: MeetingUpdate,
    user_ids: list[int],
    db_session: Session,
) -> None:
    """Tests updating a meeting.

    Args:
        users (list[UserCreate]): Users to be created.
        meeting (MeetingCreate): Meeting to be created.
        meeting_id (int): Meeting id to be updated.
        meeting_data (MeetingUpdate): Meeting data to be updated.
        user_ids (list[int]): User ids to be added to the meeting.
        db_session (Session): Database session.
    """
    for user in users:
        create_new_user(user, db_session)
    create_new_meeting(meeting, db_session)
    updated_meeting = update_meeting_with_user_ids(
        meeting_data, meeting_id, user_ids, db_session
    )
    assert updated_meeting.user_id == meeting_data.user_id
    assert updated_meeting.name == meeting_data.name
    assert updated_meeting.notes == meeting_data.notes
    assert updated_meeting.date == meeting_data.date
    assert len(updated_meeting.users) == len(user_ids)
    for user, user_id in zip(updated_meeting.users, user_ids):
        assert user.id == user_id


@pytest.mark.parametrize(
    "user,meeting,meeting_id,meeting_data,user_ids",
    [
        (user_create_unique_1, meeting_create, 1, meeting_update, [1]),
        (user_create_unique_1, meeting_create, 1, meeting_update, [1, 1]),
    ],
)
def test_incorrect_generic__update_meeting_with_user_ids(
    user: UserCreate,
    meeting: MeetingCreate,
    meeting_id: int,
    meeting_data: MeetingUpdate,
    user_ids: list[int],
    db_session: Session,
) -> None:
    """Tests trying to update a meeting with incorrect data.

    Args:
        user (UserCreate): User to be created.
        meeting (MeetingCreate): Meeting to be created.
        meeting_id (int): Meeting id to be updated.
        meeting_data (MeetingUpdate): Meeting data to be updated.
        user_ids (list[int]): User ids to be added to the meeting.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_meeting(meeting, db_session)
    with pytest.raises(GenericException):
        update_meeting_with_user_ids(meeting_data, meeting_id, user_ids, db_session)


@pytest.mark.parametrize(
    "users,meeting,meeting_id,meeting_data,user_ids,should_create_meeting",
    [
        (
            [user_create_unique_1, user_create_unique_2],
            meeting_create,
            1,
            meeting_update,
            [2],
            False,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            meeting_create,
            2,
            meeting_update,
            [2],
            False,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            meeting_create,
            1,
            meeting_update,
            [3],
            True,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            meeting_create,
            2,
            meeting_update,
            [3],
            True,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            meeting_create,
            1,
            meeting_update,
            [3],
            False,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            meeting_create,
            2,
            meeting_update,
            [3],
            False,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            meeting_create,
            1,
            meeting_update,
            [],
            True,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            meeting_create,
            2,
            meeting_update,
            [],
            True,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            meeting_create,
            1,
            meeting_update,
            [],
            False,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            meeting_create,
            2,
            meeting_update,
            [],
            False,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            meeting_create,
            1,
            meeting_update,
            [3, 3],
            True,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            meeting_create,
            2,
            meeting_update,
            [3, 3],
            True,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            meeting_create,
            1,
            meeting_update,
            [3, 3],
            False,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            meeting_create,
            2,
            meeting_update,
            [3, 3],
            False,
        ),
    ],
)
def test_incorrect_missing__update_meeting_with_user_ids(
    users: list[UserCreate],
    meeting: MeetingCreate,
    meeting_id: int,
    meeting_data: MeetingUpdate,
    user_ids: list[int],
    should_create_meeting: bool,
    db_session: Session,
) -> None:
    """Tests trying to update a meeting with incorrect data.

    Args:
        users (list[UserCreate]): Users to be created.
        meeting (MeetingCreate): Meeting to be created.
        meeting_id (int): Meeting id to be updated.
        meeting_data (MeetingUpdate): Meeting data to be updated.
        user_ids (list[int]): User ids to be added to the meeting.
        should_create_meeting (bool): Whether the provided meeting should be created.
        db_session (Session): Database session.
    """
    for user in users:
        create_new_user(user, db_session)
    if should_create_meeting:
        create_new_meeting(meeting, db_session)

    with pytest.raises(MissingException):
        update_meeting_with_user_ids(meeting_data, meeting_id, user_ids, db_session)
