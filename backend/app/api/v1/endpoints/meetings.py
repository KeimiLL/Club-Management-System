"""Meetings related endpoints."""


from typing import Annotated

from app.api.dependencies import get_user_from_token, paginate
from app.crud.crud_meeting import get_all_meetings, get_meetings_by_user_id
from app.crud.crud_meeting_user import create_meeting_user_from_user_id_list
from app.db.session import get_db
from app.models.user import User
from app.schemas.enums import Roles
from app.schemas.meeting import MeetingCreate, MeetingOnlyBaseUserInfo, MeetingTableView
from app.schemas.meeting_user import MeetingUserCreateUserIdList
from app.schemas.misc import ItemsListWithTotal, Message, MessageFromEnum
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

router = APIRouter()


@router.post(
    "",
    response_model=MeetingOnlyBaseUserInfo,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def create_meeting(
    meeting: MeetingUserCreateUserIdList,
    current_user: Annotated[User, Depends(get_user_from_token)],
    db: Annotated[Session, Depends(get_db)],
):
    """Creates a new meeting and its attendance based on data from a POST request.

    Args:
        meeting (MeetingCreate): Meeting data from POST request.
        current_user (Annotated[User, Depends]): Current user read from access token.
            Defaults to Depends(get_user_from_token).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Returns:
        MeetingInDBOnlyBaseUserInfo: Created meeting.
    """
    return create_meeting_user_from_user_id_list(
        meeting=MeetingCreate(user_id=current_user.id, **meeting.meeting.__dict__),
        user_ids=meeting.user_ids,
        db=db,
    )


@router.get(
    "",
    response_model=ItemsListWithTotal,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def get_meetings(
    pagination: Annotated[dict[str, int], Depends(paginate)],
    current_user: Annotated[User, Depends(get_user_from_token)],
    db: Annotated[Session, Depends(get_db)],
):
    """Creates a new meeting and its attendance based on data from a POST request.

    Args:
        pagination (Annotated[dict[str, int], Depends]): Pagination read from the query params.
            Defaults to Depends(paginate).
        current_user (Annotated[User, Depends]): Current user read from access token.
            Defaults to Depends(get_user_from_token).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Returns:
        ItemsListWithTotal: A list of meetings alongside their total number.
    """
    if current_user.role in (Roles.ADMIN, Roles.BOARD):
        meetings, total = get_all_meetings(
            page=pagination["page"], per_page=pagination["per_page"], db=db
        )
        return ItemsListWithTotal(
            items=[
                MeetingTableView(
                    **meeting.__dict__,
                    user_name=meeting.created_by_user.full_name,
                    is_yours=(
                        current_user.id
                        in (meeting.user_id, *map(lambda u: u.id, meeting.users))
                    )
                )
                for meeting in meetings
            ],
            total=total,
        )
    meetings, total = get_meetings_by_user_id(
        page=pagination["page"],
        per_page=pagination["per_page"],
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
