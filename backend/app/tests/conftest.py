"""File for tests configuration."""


import os
import sys
from typing import Iterator

import pytest
from app.api.base import api_router
from app.db.base import Base
from app.db.session import get_db
from fastapi import FastAPI
from starlette_testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def start_application() -> FastAPI:
    """Creates an instance of a FastAPI application.

    Returns:
        FastAPI: FastAPI instance.
    """
    application = FastAPI()
    application.include_router(api_router)
    return application


SQLALCHEMY_DATABASE_URL = "sqlite:///./test_db.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionTesting = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function", name="app")
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


@pytest.fixture(scope="function", name="db_session")
def fixture_db_session() -> Iterator[Session]:
    """Creates a new database session for testing.

    The database session is closed when a test is complete.

    Yields:
        Iterator[Session]: Database session.
    """
    connection = engine.connect()
    transaction = connection.begin()
    session = SessionTesting(bind=connection)
    yield session
    session.close()
    transaction.rollback()
    connection.close()


@pytest.fixture(scope="function", name="client")
def fixture_client(app: FastAPI, db_session: Session) -> Iterator[TestClient]:
    """Creates a new FastAPI TestClient that uses the `db_session` fixture to override
    the `get_db` dependency that is injected into routes.

    Args:
        app (FastAPI): FastAPI application instance.
        db_session (Session): Database session.

    Yields:
        Iterator[TestClient]: TestClient instance.
    """

    def _get_test_db() -> Iterator[Session]:
        """Overrides the `get_db` dependency with the `db_session` fixture.

        Yields:
            Iterator[Session]: Database session.
        """
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = _get_test_db
    with TestClient(app) as test_client:
        yield test_client