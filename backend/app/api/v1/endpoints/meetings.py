"""Meetings related endpoints."""


from typing import Annotated

from app.api.dependencies import get_user_from_token
from app.crud.crud_meeting_user import create_meeting_user_from_user_id_list
from app.db.session import get_db
from app.models.user import User
from app.schemas.meeting import MeetingCreate, MeetingOnlyBaseUserInfo
from app.schemas.meeting_user import MeetingUserCreateUserIdList
from app.schemas.misc import Message, MessageFromEnum
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
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_user_from_token)],
):
    """Creates a new meeting and its attendance based on data from a POST request.

    Args:
        meeting (MeetingCreate): Meeting data from POST request.
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).
        current_user (Annotated[User, Depends]): Current user read from access token.
            Defaults to Depends(get_user_from_token).

    Returns:
        MeetingInDBOnlyBaseUserInfo: Created meeting.
    """
    return create_meeting_user_from_user_id_list(
        meeting=MeetingCreate(user_id=current_user.id, **meeting.meeting.__dict__),
        user_ids=meeting.user_ids,
        db=db,
    )
