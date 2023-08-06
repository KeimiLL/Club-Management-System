"""File for configuring Schemathesis tests."""


import pytest
from hypothesis import HealthCheck, settings
from requests.utils import dict_from_cookiejar
from schemathesis import from_dict, from_pytest_fixture
from schemathesis.models import Case
from schemathesis.specs.openapi.schemas import BaseOpenAPISchema
from starlette_testclient import TestClient


@pytest.fixture()
def app_schema(client: TestClient) -> BaseOpenAPISchema:
    """Fixture to generate the OpenAPI schema.

    Args:
        client (TestClient): TestClient instance.

    Returns:
        BaseOpenAPISchema: OpenAPI schema.
    """
    openapi = client.app.openapi()
    return from_dict(openapi)


schema = from_pytest_fixture("app_schema")


@pytest.fixture(scope="function", name="auth_cookies")
def fixture_auth_cookies(
    client: TestClient,
    correct_user_data: dict[str, str],
) -> dict[str, str]:
    """Fixture to generate JWT tokens.

    Args:
        client (TestClient): TestClient instance.
        correct_user_data (dict[str, str]): Data to be sent.

    Returns:
        dict[str, str]: Authentication cookies.
    """
    client.post("/api/v1/users/register", json=correct_user_data)
    response = client.post(
        "/api/v1/users/login",
        json={
            "email": correct_user_data["email"],
            "password": correct_user_data["password"],
        },
    )
    return dict_from_cookiejar(response.cookies)


@schema.parametrize()
@settings(
    max_examples=20,
    suppress_health_check=[HealthCheck.data_too_large, HealthCheck.filter_too_much],
)
def test_api(case: Case, client: TestClient, auth_cookies: dict[str, str]) -> None:
    """Function to configure Schemathesis.

    Args:
        case (Case): A single test case.
        client (TestClient): TestClient instance.
        auth_cookies(dict[str, str]): Authentication cookies.
    """
    case.call_and_validate(
        session=client,
        headers={"x-xsrf-token": auth_cookies["xsrf_access_token"]},
        cookies=auth_cookies,
    )
