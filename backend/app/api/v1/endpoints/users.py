"""Users related endpoints."""


from typing import Annotated
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.crud.crud_user import create_new_user
from app.db.session import get_db
from app.schemas.user import User, UserCreate
from app.schemas.misc import Message, MessageFromEnum


router = APIRouter()


@router.post(
    "/register",
    response_model=User,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def register(user: UserCreate, db: Annotated[Session, Depends(get_db)]):
    """Creates a new user based on data from a POST request.

    Args:
        user (UserCreate): User data from POST request.
        db (Session, optional): Database session. Defaults to Depends(get_db).

    Returns:
        new_user (User): The newly created user.
    """
    return create_new_user(user=user, db=db)
