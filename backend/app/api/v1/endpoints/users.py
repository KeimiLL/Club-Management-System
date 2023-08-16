"""Users related endpoints."""


from typing import Annotated

from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_user_from_token, refresh_token_dependency
from app.core.exceptions import InvalidCredentialsException
from app.core.jwt_utils import create_access_token, create_refresh_token
from app.core.security import Hasher
from app.crud.crud_user import create_new_user, get_user_by_email
from app.db.session import get_db
from app.schemas.enums import HTTPResponseMessage
from app.schemas.misc import Message, MessageFromEnum
from app.schemas.user import User, UserCreate, UserLogin

router = APIRouter()


@router.post(
    "/register",
    response_model=Message,
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
        dict[str, HTTPResponseMessage]: The response signalling a correct register.
    """
    create_new_user(user=user, db=db)
    return {"message": HTTPResponseMessage.SUCCESS}


@router.post(
    "/login",
    response_model=User,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def login(
    response: Response,
    user: UserLogin,
    db: Annotated[Session, Depends(get_db)],
):
    """Logs the user in if the provided credentials are valid.

    Args:
        response (Response): Response object.
        user (UserLogin): User data from a POST request.
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        InvalidCredentialsException: If the provided credentials are invalid.

    Returns:
        user_by_email (User): The logged in user.
    """
    access_token = create_access_token({"sub": user.email})
    refresh_token = create_refresh_token({"sub": user.email})
    xsrf_access_token = create_access_token({"sub": user.email, "type": "xsrf"})
    xsrf_refresh_token = create_refresh_token({"sub": user.email, "type": "xsrf"})

    response.set_cookie(key="access_token", value=access_token, httponly=True)
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True)
    response.set_cookie(
        key="xsrf_access_token", value=xsrf_access_token, httponly=False
    )
    response.set_cookie(
        key="xsrf_refresh_token", value=xsrf_refresh_token, httponly=False
    )

    user_by_email = get_user_by_email(email=user.email, db=db)
    if not Hasher.verify_password(user.password, user_by_email.hashed_password):
        raise InvalidCredentialsException()
    return user_by_email


@router.post(
    "/logout",
    response_model=Message,
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
    },
)
def logout(
    response: Response,
    _: Annotated[tuple[str, str], Depends(refresh_token_dependency)],
):
    """Logs the user out by removing the necessary cookies.

    Args:
        response (Response): Response object.

    Returns:
        dict[str, HTTPResponseMessage]: The response signalling a correct logout.
    """
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    response.delete_cookie("xsrf_access_token")
    response.delete_cookie("xsrf_refresh_token")
    return {"message": HTTPResponseMessage.SUCCESS}


@router.get(
    "/current",
    response_model=User,
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_404_NOT_FOUND: {"model": Message},
    },
)
def get_current_user(
    response: Response,
    new_access_tokens: Annotated[tuple[str, str], Depends(refresh_token_dependency)],
    current_user: Annotated[str, Depends(get_user_from_token)],
):
    """Gets current user from authentication cookies.

    Args:
        response (Response): Response object.
        new_access_tokens (Annotated[tuple[str, str], Depends]): New JWT access tokens,
            generated if the previous ones have expired.
            Defaults to Depends(refresh_token_dependency).
        current_user (Annotated[str, Depends]): Current user read from access token,
            Defaults to Depends(get_user_from_token).

    Returns:
        current_user (User): The currently logged in user.
    """
    if new_access_tokens:
        access_token, xsrf_access_token = new_access_tokens
        response.set_cookie(key="access_token", value=access_token, httponly=True)
        response.set_cookie(
            key="xsrf_access_token", value=xsrf_access_token, httponly=False
        )
    return current_user
