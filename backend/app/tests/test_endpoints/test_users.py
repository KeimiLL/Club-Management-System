"""File for testing users-related endpoints."""


import pytest
from app.core.config import get_settings
from app.schemas.enums import Roles
from starlette_testclient import TestClient

data = {
    "full_name": get_settings().TEST_USER_FULL_NAME,
    "email": get_settings().TEST_USER_EMAIL,
    "password": get_settings().TEST_USER_EMAIL,
    "role": Roles.VIEWER,
}


@pytest.mark.disable_get_user_access_token_autouse
def test_register(client: TestClient) -> None:
    """Tests creating a new user.

    Args:
        client (TestClient): TestClient instance,
    """
    response = client.post("/api/v1/users/register", json=data)

    assert response.status_code == 200
    assert response.json()["full_name"] == data["full_name"]
    assert response.json()["email"] == data["email"]
    assert response.json()["role"] == data["role"]
