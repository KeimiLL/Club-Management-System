"""File for testing JWT utility functions."""


from datetime import timedelta

import pytest
from app.core.jwt_utils import create_token, decode_token
from jose import ExpiredSignatureError, JWTError


def test_correct__decode_token(correct_user_data: dict[str, str]) -> None:
    """Tests correctly encoding and decoding a JWT token.

    Args:
        correct_user_data (dict[str, str]): Correct user data.
    """
    new_token = create_token({"sub": correct_user_data["email"]}, timedelta(minutes=1))
    payload = decode_token(new_token)
    assert isinstance(payload["exp"], float)
    assert payload["sub"] == correct_user_data["email"]


def test_expired__decode_token(correct_user_data: dict[str, str]) -> None:
    """Tests decoding an expired JWT token.

    Args:
        correct_user_data (dict[str, str]): Correct user data.
    """
    with pytest.raises(ExpiredSignatureError):
        new_token = create_token(
            {"sub": correct_user_data["email"]}, timedelta(minutes=-1)
        )
        decode_token(new_token)


def test_incorrect__decode_token() -> None:
    """Tests decoding an invalid JWT token."""
    with pytest.raises(JWTError):
        decode_token("test")
