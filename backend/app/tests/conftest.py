"""File for tests configuration."""


import os
import sys
from typing import Iterator

import pytest
from app.api.base import api_router
from app.core.config import get_settings
from app.db.base import Base
from app.db.session import get_db
from app.main import include_exception_handlers
from app.schemas.enums import Roles
from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session, sessionmaker
from starlette_testclient import TestClient

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def start_application() -> FastAPI:
    """Creates an instance of a FastAPI application.

    Returns:
        FastAPI: FastAPI instance.
    """
    application = FastAPI()
    application.include_router(api_router)
    include_exception_handlers(application)
    return application


SQLALCHEMY_DATABASE_URL = "sqlite:///./test_db.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionTesting = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="module", name="app")
def fixture_app() -> Iterator[FastAPI]:
    """Creates an instance of a FastAPI application with a test sqlite database.

    The database is cleared after a test is complete.

    Yields:
        Iterator[FastAPI]: FastAPI instance.
    """
    Base.metadata.create_all(engine)
    _app = start_application()
    yield _app
    Base.metadata.drop_all(engine)


@pytest.fixture(scope="module", name="db_session")
def fixture_db_session() -> Iterator[Session]:
    """Creates a new database session for testing.

    The database session is closed when a test is complete.

    Yields:
        Iterator[Session]: Database session.
    """
    with engine.connect() as connection:
        with connection.begin():
            with Session(bind=connection) as session:
                yield session


@pytest.fixture(scope="module", name="client")
def fixture_client(app: FastAPI) -> Iterator[TestClient]:
    """Creates a new FastAPI TestClient that uses the `db_session` fixture to override
    the `get_db` dependency that is injected into routes.

    Args:
        app (FastAPI): FastAPI application instance.

    Yields:
        Iterator[TestClient]: TestClient instance.
    """

    def _get_test_db() -> Iterator[Session]:
        """Overrides the `get_db` dependency with the `db_session` fixture.

        Yields:
            Iterator[Session]: Database session.
        """
        transaction = None
        try:
            with engine.connect() as connection:
                with connection.begin() as transaction:
                    with Session(bind=connection) as session:
                        yield session
        except SQLAlchemyError:
            if transaction:
                transaction.rollback()

    app.dependency_overrides[get_db] = _get_test_db
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture(scope="module", name="correct_user_data")
def fixture_correct_user_data() -> dict[str, str]:
    """Provides correct user data.

    Returns:
        dict[str, str]: Correct user data.
    """
    return {
        "full_name": get_settings().TEST_USER_FULL_NAME,
        "email": get_settings().TEST_USER_EMAIL,
        "password": get_settings().TEST_USER_EMAIL,
        "role": Roles.VIEWER,
    }


@pytest.fixture(scope="module", name="incorrect_user_data")
def fixture_incorrect_user_data() -> dict[str, str]:
    """Provides incorrect user data.

    Returns:
        dict[str, str]: Incorrect user data.
    """
    return {
        "full_name": get_settings().TEST_USER_FULL_NAME + "m",
        "email": get_settings().TEST_USER_EMAIL + "m",
        "password": get_settings().TEST_USER_EMAIL + "m",
        "role": Roles.VIEWER,
    }
