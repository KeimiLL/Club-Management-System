"""Users related endpoints."""


from typing import Annotated

from app.core.exceptions import InvalidCredentialsException
from app.core.security import Hasher
from app.crud.crud_user import create_new_user, get_user_by_email
from app.db.session import get_db
from app.schemas.enums import ExceptionMessages
from app.schemas.misc import Message, MessageFromEnum
from app.schemas.user import User, UserCreate, UserLogin
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

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
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Returns:
        (User): The newly created user.
    """
    return create_new_user(user=user, db=db)


@router.post(
    "/login",
    response_model=User,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def login(user: UserLogin, db: Annotated[Session, Depends(get_db)]):
    """Logs the user in if the provided credentials are valid.

    Args:
        user (UserLogin): User data from a POST request.
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        InvalidCredentialsException: If the provided credentials are invalid.

    Returns:
        user_by_email (User): The logged in user.
    """
    user_by_email = get_user_by_email(email=user.email, db=db)
    if not Hasher.verify_password(user.password, user_by_email.hashed_password):
        raise InvalidCredentialsException()
    return user_by_email


@router.post("/logout", response_model=Message)
def logout():
    """Logs the user out.

    Returns:
        (JSONResponse): The response signalling a correct logout.
    """
    return JSONResponse(status_code=200, content={"message": ExceptionMessages.SUCCESS})
