"""File for testing users-related endpoints."""


from app.schemas.enums import Roles
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
    assert response.json()["full_name"] == correct_user_data["full_name"]
    assert response.json()["email"] == correct_user_data["email"]
    assert response.json()["role"] == Roles.VIEWER


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


def test_correct__login(client: TestClient, correct_user_data: dict[str, str]) -> None:
    """Tests logging an exising user in.

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


def test_incorrect__login(
    client: TestClient, incorrect_user_data: dict[str, str]
) -> None:
    """Tests logging an exising user in.

    Args:
        client (TestClient): TestClient instance.
        incorrect_user_data (dict[str, str]): Data to be sent.
    """
    print(f"{incorrect_user_data['email']=}")
    response = client.post(
        "/api/v1/users/login",
        json={
            "email": incorrect_user_data["email"],
            "password": incorrect_user_data["password"],
        },
    )

    assert response.status_code == 404
    assert "does not exist" in response.json()["message"]
