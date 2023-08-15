"""File for testing users-related endpoints."""


import pytest
from app.core.config import get_settings
from app.schemas.enums import HTTPResponseMessage, Roles
from starlette_testclient import TestClient


def test_correct__register(
    client: TestClient, correct_user_data: dict[str, str]
) -> None:
    """Tests creating a new user.

    Args:
        client (TestClient): TestClient instance.
        correct_user_data (dict[str, str]): Data to be sent.
    """
    response = client.post("/api/v1/users/register", json=correct_user_data)

    assert response.status_code == 200
    assert response.json()["message"] == HTTPResponseMessage.SUCCESS
    assert "access_token" not in response.cookies
    assert "refresh_token" not in response.cookies
    assert "xsrf_access_token" not in response.cookies
    assert "xsrf_refresh_token" not in response.cookies


def test_duplicate__register(
    client: TestClient, correct_user_data: dict[str, str]
) -> None:
    """Tests creating a new user.

    Args:
        client (TestClient): TestClient instance.
        correct_user_data (dict[str, str]): Data to be sent.
    """
    response = client.post("/api/v1/users/register", json=correct_user_data)

    assert response.status_code == 400
    assert "already exists" in response.json()["message"]
    assert "access_token" not in response.cookies
    assert "refresh_token" not in response.cookies
    assert "xsrf_access_token" not in response.cookies
    assert "xsrf_refresh_token" not in response.cookies


@pytest.mark.parametrize(
    "user_data",
    [
        {},
        {1: 1},
        {1: 1, 2: 2},
        {1: 1, 2: 2, 3: 3},
        {1: 1, 2: 2, 3: 3, 4: 4},
        {"email": ""},
        {"password": ""},
        {"full_name": ""},
        {"email": "", "password": ""},
        {"full_name": "", "password": ""},
        {"full_name": "", "email": ""},
        {"full_name": "", "email": "test", "password": ""},
        {"full_name": "", "email": "test", "password": ""},
        {"full_name": "", "email": "test", "password": "", "role": Roles.ADMIN},
        {
            "full_name": get_settings().TEST_USER_FULL_NAME,
            "email": get_settings().TEST_USER_FULL_NAME,
            "password": get_settings().TEST_USER_PASSWORD,
        },
    ],
)
def test_incorrect_data__register(client: TestClient, user_data: dict) -> None:
    """Tests creating a new user.

    Args:
        client (TestClient): TestClient instance.
        user_data (dict[str, str]): Data to be sent.
    """
    response = client.post("/api/v1/users/register", json=user_data)

    assert response.status_code == 422
    assert "access_token" not in response.cookies
    assert "refresh_token" not in response.cookies
    assert "xsrf_access_token" not in response.cookies
    assert "xsrf_refresh_token" not in response.cookies


def test_correct__login(client: TestClient, correct_user_data: dict[str, str]) -> None:
    """Tests logging an existing user in.

    Args:
        client (TestClient): TestClient instance.
        correct_user_data (dict[str, str]): Data to be sent.
    """
    response = client.post(
        "/api/v1/users/login",
        json={
            "email": correct_user_data["email"],
            "password": correct_user_data["password"],
        },
    )

    assert response.status_code == 200
    assert response.json()["full_name"] == correct_user_data["full_name"]
    assert response.json()["email"] == correct_user_data["email"]
    assert response.json()["role"] == correct_user_data["role"]
    assert "access_token" in response.cookies
    assert "refresh_token" in response.cookies
    assert "xsrf_access_token" in response.cookies
    assert "xsrf_refresh_token" in response.cookies


def test_incorrect__login(
    client: TestClient, incorrect_user_data: dict[str, str]
) -> None:
    """Tests logging an existing user in.

    Args:
        client (TestClient): TestClient instance.
        incorrect_user_data (dict[str, str]): Data to be sent.
    """
    response = client.post(
        "/api/v1/users/login",
        json={
            "email": incorrect_user_data["email"],
            "password": incorrect_user_data["password"],
        },
    )

    assert response.status_code == 400
    assert "Incorrect email or password" in response.json()["message"]
    assert "access_token" not in response.cookies
    assert "refresh_token" not in response.cookies
    assert "xsrf_access_token" not in response.cookies
    assert "xsrf_refresh_token" not in response.cookies


@pytest.mark.parametrize(
    "user_data",
    [
        {},
        {1: 1},
        {1: 1, 2: 2},
        {1: 1, 2: 2, 3: 3},
        {"email": ""},
        {"password": ""},
        {"full_name": ""},
        {"email": "", "password": ""},
        {"full_name": "", "password": ""},
        {"full_name": "", "email": ""},
        {"full_name": "", "email": "test", "password": ""},
        {
            "full_name": get_settings().TEST_USER_FULL_NAME,
            "email": get_settings().TEST_USER_FULL_NAME,
            "password": get_settings().TEST_USER_PASSWORD,
        },
    ],
)
def test_incorrect_data__login(client: TestClient, user_data: dict) -> None:
    """Tests logging an existing user in.

    Args:
        client (TestClient): TestClient instance.
        user_data (dict[str, str]): Data to be sent.
    """
    response = client.post(
        "/api/v1/users/login",
        json=user_data,
    )

    assert response.status_code == 422
    assert "access_token" not in response.cookies
    assert "refresh_token" not in response.cookies
    assert "xsrf_access_token" not in response.cookies
    assert "xsrf_refresh_token" not in response.cookies


def test_correct__logout(client: TestClient, correct_user_data: dict[str, str]) -> None:
    """Tests logging an exising user out.

    Args:
        client (TestClient): TestClient instance.
        correct_user_data (dict[str, str]): Data to be sent.
    """
    response = client.post(
        "/api/v1/users/login",
        json={
            "email": correct_user_data["email"],
            "password": correct_user_data["password"],
        },
    )
    xsrf_token = response.cookies["xsrf_access_token"]
    response = client.post("/api/v1/users/logout", headers={"x-xsrf-token": xsrf_token})

    assert response.status_code == 200
    assert response.json()["message"] == HTTPResponseMessage.SUCCESS
    assert "access_token" not in response.cookies
    assert "refresh_token" not in response.cookies
    assert "xsrf_access_token" not in response.cookies
    assert "xsrf_refresh_token" not in response.cookies


def test_incorrect__logout(client: TestClient) -> None:
    """Tests logging out when the user isn't logged in.

    Args:
        client (TestClient): TestClient instance.
    """
    response = client.post(
        "/api/v1/users/logout",
    )

    assert response.status_code == 401
    assert response.json()["message"] == "Invalid tokens"
    assert "access_token" not in response.cookies
    assert "refresh_token" not in response.cookies
    assert "xsrf_access_token" not in response.cookies
    assert "xsrf_refresh_token" not in response.cookies


def test_correct__get_current_user(
    client: TestClient,
    correct_user_data: dict[str, str],
) -> None:
    """Tests getting the currently logged in user.

    Args:
        client (TestClient): TestClient instance.
        correct_user_data (dict[str, str]): Data to be sent.
    """
    response = client.post(
        "/api/v1/users/login",
        json={
            "email": correct_user_data["email"],
            "password": correct_user_data["password"],
        },
    )
    xsrf_token = response.cookies["xsrf_access_token"]
    response = client.get("/api/v1/users/current", headers={"x-xsrf-token": xsrf_token})

    assert response.status_code == 200
    assert response.json()["full_name"] == correct_user_data["full_name"]
    assert response.json()["email"] == correct_user_data["email"]
    assert response.json()["role"] == correct_user_data["role"]
    assert "access_token" not in response.cookies
    assert "refresh_token" not in response.cookies
    assert "xsrf_access_token" not in response.cookies
    assert "xsrf_refresh_token" not in response.cookies


def test_incorrect__get_current_user(
    client: TestClient,
) -> None:
    """Tests getting the currently logged in when there is none.

    Args:
        client (TestClient): TestClient instance.
    """
    client.post(
        "/api/v1/users/logout",
    )
    response = client.get(
        "/api/v1/users/current",
    )

    assert response.status_code == 401
    assert response.json()["message"] == "Invalid tokens"
    assert "access_token" not in response.cookies
    assert "refresh_token" not in response.cookies
    assert "xsrf_access_token" not in response.cookies
    assert "xsrf_refresh_token" not in response.cookies
