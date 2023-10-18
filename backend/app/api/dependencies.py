"""File for API dependencies."""


from typing import Annotated

from app.core.exceptions import JWTTokensException
from app.core.jwt_utils import create_access_token, decode_token
from app.crud.crud_user import get_user_by_email
from app.db.session import get_db
from app.models.user import User
from fastapi import Cookie, Depends, Header, Query, Response
from jose import ExpiredSignatureError, JWTError
from sqlalchemy.orm import Session


def refresh_token_dependency(
    response: Response,
    access_token: Annotated[str | None, Cookie()] = None,
    refresh_token: Annotated[str | None, Cookie()] = None,
    xsrf_access_token: Annotated[str | None, Cookie()] = None,
    xsrf_refresh_token: Annotated[str | None, Cookie()] = None,
    x_xsrf_token: Annotated[str | None, Header()] = None,
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
        if (
            not access_token
            or not refresh_token
            or not xsrf_access_token
            or not xsrf_refresh_token
            or not x_xsrf_token
        ):
            raise JWTTokensException("Invalid tokens")
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
