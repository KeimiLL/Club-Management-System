"""File for configuring Schemathesis tests."""


import pytest
from hypothesis import settings
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


@schema.parametrize()
@settings(max_examples=100)
def test_api(case: Case, client: TestClient) -> None:
    """Function to configure Schemathesis.

    Args:
        case (Case): A single test case.
        client (TestClient): TestClient instance.
    """
    case.call_and_validate(session=client)
