"""File with methods to handle JWT tokens."""


from datetime import datetime, timedelta
from typing import Optional

from jose import ExpiredSignatureError, JWTError, jwt

from app.core.config import get_settings
from app.core.exceptions import JWTTokensException


def create_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Creates a JWT token with the provided data.

    Args:
        data (dict): A dictionary with the data to encode inside the token.
        expires_delta (Optional[timedelta], optional): Expiry time for the token. Defaults to None.

    Returns:
        str: The encoded JWT token.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(minutes=15)
    to_encode.update({"exp": expire.timestamp()})
    encoded_jwt = jwt.encode(
        to_encode, get_settings().SECRET_KEY, algorithm=get_settings().ALGORITHM
    )
    return encoded_jwt


def create_access_token(data: dict) -> str:
    """Creates an access token with the provided data and an expiry time read from settings.

    Args:
        data (dict): A dictionary with the data to encode inside the token.

    Returns:
        str: The encoded access JWT token.
    """
    return create_token(
        data,
        expires_delta=timedelta(minutes=get_settings().ACCESS_TOKEN_EXPIRE_MINUTES),
    )


def create_refresh_token(data: dict) -> str:
    """Creates a refresh token with the provided data and an expiry time read from settings.

    Args:
        data (dict): A dictionary with the data to encode inside the token.

    Returns:
        str: The encoded refresh JWT token.
    """
    return create_token(
        data, expires_delta=timedelta(days=get_settings().REFRESH_TOKEN_EXPIRE_DAYS)
    )


def decode_token(token: str) -> dict:
    """Decodes the provided JWT token.

    Raises:
        JWTTokensException: If the provided token is invalid or expired.

    Returns:
        dict: The decoded JWT token.
    """
    try:
        return jwt.decode(
            token, get_settings().SECRET_KEY, algorithms=get_settings().ALGORITHM
        )
    except ExpiredSignatureError as exc:
        raise JWTTokensException("Expired tokens") from exc
    except JWTError as exc:
        raise JWTTokensException("Invalid tokens") from exc
