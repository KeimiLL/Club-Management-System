"""Meetings related endpoints."""


from typing import Annotated

from app.api.dependencies import get_user_from_token, paginate
from app.core.exceptions import ForbiddenException
from app.crud.crud_meeting import (
    create_meeting_with_user_ids,
    get_all_meetings_with_pagination,
    get_meeting_by_id,
    get_meetings_with_pagination_by_user_id,
    update_meeting_with_user_ids,
)
from app.db.session import get_db
from app.models.user import User
from app.schemas.enums import HTTPResponseMessage, Roles
from app.schemas.meeting import MeetingCreate, MeetingSideView, MeetingTableView
from app.schemas.meeting_user import MeetingUserCreateUserIdList, MeetingUserUpdate
from app.schemas.misc import ItemsListWithTotal, Message, MessageFromEnum
from fastapi import APIRouter, Depends, Path, status
from sqlalchemy.orm import Session

router = APIRouter()


@router.post(
    "",
    response_model=Message,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def create_meeting(
    meeting_user: MeetingUserCreateUserIdList,
    current_user: Annotated[User, Depends(get_user_from_token)],
    db: Annotated[Session, Depends(get_db)],
):
    """Creates a new meeting and its attendance based on data from a POST request.

    Args:
        meeting_user (MeetingUserCreateUserIdList): Meeting data from POST request.
        current_user (Annotated[User, Depends]): Current user read from access token.
            Defaults to Depends(get_user_from_token).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Returns:
        Message: The response signalling a successful operation.
    """
    create_meeting_with_user_ids(
        meeting=MeetingCreate(user_id=current_user.id, **meeting_user.meeting.__dict__),
        user_ids=meeting_user.user_ids,
        db=db,
    )
    return Message(message=HTTPResponseMessage.SUCCESS)


@router.get(
    "",
    response_model=ItemsListWithTotal[MeetingTableView],
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def get_meetings_with_pagination(
    pagination: Annotated[dict[str, int], Depends(paginate)],
    current_user: Annotated[User, Depends(get_user_from_token)],
    db: Annotated[Session, Depends(get_db)],
):
    """Gets meetings with pagination depending on the current user's role.

    Args:
        pagination (Annotated[dict[str, int], Depends]): Pagination read from the query params.
            Defaults to Depends(paginate).
        current_user (Annotated[User, Depends]): Current user read from access token.
            Defaults to Depends(get_user_from_token).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Returns:
        ItemsListWithTotal[MeetingTableView]: A list of meetings alongside their total number.
    """
    if current_user.role in (Roles.ADMIN, Roles.BOARD):
        meetings, total = get_all_meetings_with_pagination(**pagination, db=db)
        return ItemsListWithTotal[MeetingTableView](
            items=[
                MeetingTableView(
                    **meeting.__dict__,
                    user_name=meeting.created_by_user.full_name,
                    is_yours=(
                        current_user.id
                        in (meeting.user_id, *[user.id for user in meeting.users])
                    ),
                )
                for meeting in meetings
            ],
            total=total,
        )
    meetings, total = get_meetings_with_pagination_by_user_id(
        **pagination,
        user_id=current_user.id,
        db=db,
    )
    return ItemsListWithTotal(
        items=[
            MeetingTableView(
                **meeting.__dict__, user_name=meeting.created_by_user.full_name
            )
            for meeting in meetings
        ],
        total=total,
    )


@router.get(
    "/{meeting_id}",
    response_model=MeetingSideView,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": MessageFromEnum},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def get_meeting(
    meeting_id: Annotated[int, Path(ge=1, le=10**7)],
    current_user: Annotated[User, Depends(get_user_from_token)],
    db: Annotated[Session, Depends(get_db)],
):
    """Returns the meeting by the given id.

    Args:
        meeting_id (Annotated[int, Path]): The requested meeting's id. Has to be greater than
            or equal to 1 and less than or equal to 10**7.
        current_user (Annotated[User, Depends]): Current user read from access token.
            Defaults to Depends(get_user_from_token).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        ForbiddenException: If the current user does not have sufficient permissions.

    Returns:
        MeetingSideView: The requested meeting.
    """
    meeting = get_meeting_by_id(meeting_id=meeting_id, db=db)
    if current_user.role in (Roles.ADMIN, Roles.BOARD) or current_user.id in (
        meeting.user_id,
        *[user.id for user in meeting.users],
    ):
        return meeting
    raise ForbiddenException()


@router.put(
    "/{meeting_id}",
    response_model=MeetingSideView,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": MessageFromEnum},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def update_meeting(
    meeting_id: Annotated[int, Path(ge=1, le=10**7)],
    meeting_user: MeetingUserUpdate,
    current_user: Annotated[User, Depends(get_user_from_token)],
    db: Annotated[Session, Depends(get_db)],
):
    """Updates meeting data with the given data.

    Args:
        meeting_id (Annotated[int, Path]): The given meeting's id. Has to be greater than
            or equal to 1 and less than or equal to 10**7.
        meeting_user (MeetingUserUpdate): Meeting data to update.
        current_user (Annotated[User, Depends]): Current user read from access token.
            Defaults to Depends(get_user_from_token).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        ForbiddenException: If the current user does not have sufficient permissions.

    Returns:
        MeetingSideView: The updated meeting.
    """
    meeting = get_meeting_by_id(meeting_id=meeting_id, db=db)
    if (
        current_user.role in (Roles.ADMIN, Roles.BOARD)
        or current_user.id == meeting.user_id
    ):
        return update_meeting_with_user_ids(
            meeting_update=meeting_user.meeting,
            meeting_id=meeting_id,
            user_ids=meeting_user.user_ids,
            db=db,
        )
    raise ForbiddenException()
