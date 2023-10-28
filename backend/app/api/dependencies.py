"""File for API dependencies."""


from typing import Annotated

from app.core.exceptions import ForbiddenException, JWTTokensException
from app.core.jwt_utils import create_access_token, decode_token
from app.crud.crud_user import get_user_by_email
from app.db.session import get_db
from app.models.user import User
from app.schemas.enums import HTTPResponseMessage, Roles
from fastapi import Depends, Query, Request, Response
from fastapi.security import APIKeyCookie as ApiKeyCookie403
from fastapi.security import APIKeyHeader as ApiKeyHeader403
from jose import ExpiredSignatureError, JWTError
from sqlalchemy.orm import Session


class APIKeyHeader(ApiKeyHeader403):
    """Custom implementation of fastapi.security.APIKeyHeader, raising a custom exception if
    an api key was not found."""

    async def __call__(self, request: Request) -> str:
        """Overrides the inherited implementation to raise a custom exception.

        Args:
            request (Request): The passed request to check for an api key.

        Raises:
            JWTTokensException: If the key is missing from the request headers.

        Returns:
            str: The api key.
        """
        api_key = request.headers.get(self.model.name)
        if not api_key:
            raise JWTTokensException(message=HTTPResponseMessage.UNAUTHENTICATED)
        return api_key


class APIKeyCookie(ApiKeyCookie403):
    """Custom implementation of fastapi.security.APIKeyCookie, raising a custom exception if
    an api key was not found."""

    async def __call__(self, request: Request) -> str:
        """Overrides the inherited implementation to raise a custom exception.

        Args:
            request (Request): The passed request to check for an api key.

        Raises:
            JWTTokensException: If the key is missing from the request cookies.

        Returns:
            str: The api key.
        """
        api_key = request.cookies.get(self.model.name)
        if not api_key:
            raise JWTTokensException(message=HTTPResponseMessage.UNAUTHENTICATED)
        return api_key


access_token_scheme = APIKeyCookie(name="access_token")
refresh_token_scheme = APIKeyCookie(name="refresh_token")
xsrf_access_token_scheme = APIKeyCookie(name="xsrf_access_token")
xsrf_refresh_token_scheme = APIKeyCookie(name="xsrf_refresh_token")
xsrf_header_scheme = APIKeyHeader(name="x-xsrf-token")


def refresh_token_dependency(
    response: Response,
    access_token: Annotated[str, Depends(access_token_scheme)],
    refresh_token: Annotated[str, Depends(refresh_token_scheme)],
    xsrf_access_token: Annotated[str, Depends(xsrf_access_token_scheme)],
    xsrf_refresh_token: Annotated[str, Depends(xsrf_refresh_token_scheme)],
    x_xsrf_token: Annotated[str, Depends(xsrf_header_scheme)],
) -> str:
    """Dependency to refresh access_token if it has expired.

    Args:
        response (Response): Response object.
        access_token (Annotated[str | None, Cookie, optional]): JWT access token.
            Defaults to None.
        refresh_token (Annotated[str | None, Cookie, optional]): JWT refresh token.
            Defaults to None.
        xsrf_access_token (Annotated[str | None, Cookie, optional]): JWT access token
            used for XSRF protection. Defaults to None.
        xsrf_refresh_token (Annotated[str | None, Cookie, optional]): JWT refresh token
            used for XSRF protection. Defaults to None.
        x_xsrf_token (Annotated[str | None, Header, optional]): JWT token header
            used for XSRF protection. Defaults to None.

    Raises:
        JWTTokensException: If both access and refresh tokens are expired.
        JWTTokensException: If any of the tokens is invalid in another way.

    Returns:
        str: Refreshed access_token if it has expired, access_token cookie value otherwise.
    """
    try:
        decode_token(access_token)
        try:
            if (
                decode_token(xsrf_access_token)["type"] != "xsrf"
                or xsrf_access_token != x_xsrf_token
            ):
                raise JWTTokensException("Invalid tokens")
        except KeyError as exc:
            raise JWTTokensException("Invalid tokens") from exc
        return access_token
    except ExpiredSignatureError:
        try:
            refresh_payload = decode_token(str(refresh_token))
            new_access_token = create_access_token({"sub": refresh_payload["sub"]})

            decode_token(str(xsrf_refresh_token))
            new_xsrf_access_token = create_access_token(
                {"sub": refresh_payload["sub"], "type": "xsrf"}
            )

            response.set_cookie(
                key="access_token", value=new_access_token, httponly=True
            )
            response.set_cookie(
                key="xsrf_access_token", value=new_xsrf_access_token, httponly=False
            )
            return new_access_token
        except ExpiredSignatureError as exc:
            raise JWTTokensException("Expired tokens") from exc
    except JWTError as exc:
        raise JWTTokensException("Invalid tokens") from exc


def get_user_from_token(
    db: Annotated[Session, Depends(get_db)],
    access_token: Annotated[str, Depends(refresh_token_dependency)],
) -> User:
    """Decodes the token and returns the user read by decoded email.

    Args:
        db (Annotated[Session, Depends]): Database session. Defaults to Depends(get_db).
        access_token (Annotated[str, Depends]): Valid JWT access token.
            Defaults to Depends(refresh_token_dependency).

    Returns:
        User: User read by decoded email.
    """
    try:
        payload = decode_token(access_token)
        email: str = payload["sub"]
        return get_user_by_email(email, db)
    except ExpiredSignatureError as exc:
        raise JWTTokensException("Expired tokens") from exc
    except JWTError as exc:
        raise JWTTokensException("Invalid tokens") from exc


class CanUserAccessEndpoint:
    """Dependency class for checking whether the current user is authorised to use an endpoint"""

    def __init__(self, disallowed_roles: set[Roles] | None = None) -> None:
        """Initializes the class instance with an optional set of disallowed roles.

        Args:
            disallowed_roles (list[Roles], optional): The set of disallowed roles.
                Defaults to None.
        """
        if disallowed_roles is None:
            disallowed_roles = set()
        self.disallowed_roles = disallowed_roles | {Roles.NONE}

    def __call__(
        self,
        current_user: Annotated[User, Depends(get_user_from_token)],
    ) -> User:
        """Checks if the current user is authorized to access an endpoint.

        Args:
            current_user (User): The user retrieved from the access token.

        Raises:
            ForbiddenException: If the current user does not have sufficient permissions.

        Returns:
            User: The current user if authorized.
        """
        if current_user.role not in self.disallowed_roles:
            return current_user
        raise ForbiddenException()


def paginate(
    page: Annotated[int, Query(ge=0, lt=10000)],
    per_page: Annotated[int, Query(gt=0, le=100)],
) -> dict[str, int]:
    """Common dependency for getting pagination parameters from a GET request.

    Args:
        page (Annotated[int, Query]): The page number, has to be greater than
            or equal to 0 and less than 100.
        per_page (Annotated[int, Query]): The number of items per page,
            has to be greater than 0 and less than or equal to 100.

    Returns:
        dict[str, int]: The extracted query values.
    """
    return {"page": page, "per_page": per_page}
