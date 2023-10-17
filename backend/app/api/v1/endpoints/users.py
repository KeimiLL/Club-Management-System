"""Users related endpoints."""


from typing import Annotated

from app.api.dependencies import get_user_from_token, paginate, refresh_token_dependency
from app.core.exceptions import (
    ForbiddenException,
    InvalidCredentialsException,
    MissingException,
)
from app.core.jwt_utils import create_access_token, create_refresh_token
from app.core.security import Hasher
from app.crud.crud_user import (
    create_new_user,
    get_all_users,
    get_all_users_with_pagination,
    get_user_by_email,
    update_user_password,
    update_user_role,
)
from app.db.session import get_db
from app.models.user import User as UserModel
from app.schemas.enums import HTTPResponseMessage, Roles
from app.schemas.misc import ItemsListWithTotal, Message, MessageFromEnum
from app.schemas.user import (
    User,
    UserCreate,
    UserLogin,
    UserOnlyBaseInfo,
    UserUpdatePassword,
    UserUpdateRole,
)
from fastapi import APIRouter, Depends, Path, Response, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

router = APIRouter()


@router.post(
    "/register",
    response_model=MessageFromEnum,
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
        Message: The response signalling a successful operation.
    """
    create_new_user(user=user, db=db)
    return Message(message=HTTPResponseMessage.SUCCESS)


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
        key="xsrf_refresh_token", value=xsrf_refresh_token, httponly=True
    )

    try:
        user_by_email = get_user_by_email(email=user.email, db=db)
        if not Hasher.verify_password(user.password, user_by_email.hashed_password):
            raise InvalidCredentialsException()
    except (MissingException, SQLAlchemyError) as exc:
        raise InvalidCredentialsException() from exc
    return user_by_email


@router.post(
    "/logout",
    response_model=MessageFromEnum,
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
    },
)
def logout(
    response: Response,
    _: Annotated[str, Depends(refresh_token_dependency)],
):
    """Logs the user out by removing the necessary cookies.

    Args:
        response (Response): Response object.

    Returns:
        Message: The response signalling a successful operation.
    """
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    response.delete_cookie("xsrf_access_token")
    response.delete_cookie("xsrf_refresh_token")
    return Message(message=HTTPResponseMessage.SUCCESS)


@router.get(
    "/current",
    response_model=User,
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_404_NOT_FOUND: {"model": Message},
    },
)
def get_current_user(
    current_user: Annotated[UserModel, Depends(get_user_from_token)],
):
    """Gets current user from authentication cookies.

    Args:
        current_user (Annotated[UserModel, Depends]): Current user read from access token.
            Defaults to Depends(get_user_from_token).

    Returns:
        current_user (User): The currently logged in user.
    """
    return current_user


@router.get(
    "/all",
    response_model=list[UserOnlyBaseInfo],
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
    },
)
def get_users(
    _: Annotated[str, Depends(refresh_token_dependency)],
    db: Annotated[Session, Depends(get_db)],
):
    """Gets the list of all registered users.

    Args:
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Returns:
        list[UserOnlyBaseInfo]: The list of all users.
    """
    return get_all_users(db=db)


@router.post(
    "/{user_id}/role",
    response_model=MessageFromEnum,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": Message},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def change_user_role(
    user_id: Annotated[int, Path(ge=1, le=10**7)],
    role_data: UserUpdateRole,
    current_user: Annotated[UserModel, Depends(get_user_from_token)],
    db: Annotated[Session, Depends(get_db)],
):
    """Updates meeting data with the given data.

    Args:
        user_id (Annotated[int, Path]): The requested user id. Has to be greater than
            or equal to 1 and less than or equal to 10**7.
        role_data (UserUpdateRole): User role to be set.
        current_user (Annotated[UserModel, Depends]): Current user read from access token.
            Defaults to Depends(get_user_from_token).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        ForbiddenException: If the current user does not have sufficient permissions.

    Returns:
        Message: The response signalling a successful operation.
    """
    if current_user.role in (Roles.ADMIN, Roles.BOARD):
        update_user_role(user_id=user_id, role=role_data.role, db=db)
        return Message(message=HTTPResponseMessage.SUCCESS)
    raise ForbiddenException("user")


@router.put(
    "/{user_id}/password",
    response_model=MessageFromEnum,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": Message},
        status.HTTP_404_NOT_FOUND: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def change_user_password(
    user_id: Annotated[int, Path(ge=1, le=10**7)],
    password_data: UserUpdatePassword,
    current_user: Annotated[UserModel, Depends(get_user_from_token)],
    db: Annotated[Session, Depends(get_db)],
):
    """Updates meeting data with the given data.

    Args:
        user_id (Annotated[int, Path]): The requested user id. Has to be greater than
            or equal to 1 and less than or equal to 10**7.
        password_data (UserUpdatePassword): User password data to be validated and set.
        current_user (Annotated[UserModel, Depends]): Current user read from access token.
            Defaults to Depends(get_user_from_token).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        ForbiddenException: If the current user does not have sufficient permissions.
        InvalidCredentialsException: If the provided password is invalid.

    Returns:
        Message: The response signalling a successful operation.
    """
    if current_user.role == Roles.ADMIN and current_user.id != user_id:
        update_user_password(
            user_id=user_id,
            new_hashed_password=Hasher.get_password_hash(password_data.new_password),
            db=db,
        )
        return Message(message=HTTPResponseMessage.SUCCESS)
    if current_user.id == user_id:
        if password_data.old_password is not None and Hasher.verify_password(
            password_data.old_password, current_user.hashed_password
        ):
            update_user_password(
                user_id=user_id,
                new_hashed_password=Hasher.get_password_hash(
                    password_data.new_password
                ),
                db=db,
            )
            return Message(message=HTTPResponseMessage.SUCCESS)
        raise InvalidCredentialsException(True)
    raise ForbiddenException("user")


@router.get(
    "",
    response_model=ItemsListWithTotal[User],
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Message},
        status.HTTP_401_UNAUTHORIZED: {"model": Message},
        status.HTTP_403_FORBIDDEN: {"model": Message},
        status.HTTP_409_CONFLICT: {"model": MessageFromEnum},
    },
)
def get_users_with_pagination(
    pagination: Annotated[dict[str, int], Depends(paginate)],
    current_user: Annotated[UserModel, Depends(get_user_from_token)],
    db: Annotated[Session, Depends(get_db)],
):
    """Gets the list of all registered users.

    Args:
        pagination (Annotated[dict[str, int], Depends]): Pagination read from the query params.
            Defaults to Depends(paginate).
        current_user (Annotated[UserModel, Depends]): Current user read from access token.
            Defaults to Depends(get_user_from_token).
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).

    Raises:
        ForbiddenException: If the current user does not have sufficient permissions.

    Returns:
        ItemsListWithTotal[User]: A list of users alongside their total number.
    """
    if current_user.role == Roles.ADMIN:
        users, total = get_all_users_with_pagination(
            **pagination,
            db=db,
        )
        return ItemsListWithTotal[User](
            items=[User(**user.__dict__) for user in users], total=total
        )
    raise ForbiddenException("meeting")
