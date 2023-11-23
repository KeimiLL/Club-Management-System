"""File for tests configuration."""


import datetime
import os
import sys
from typing import Iterator

import pytest
from app.api.base import api_router
from app.core.config import get_settings
from app.db.base import Base
from app.db.session import get_db
from app.main import include_exception_handlers, include_middleware
from app.schemas.coach import CoachCreate, CoachUpdate
from app.schemas.enums import EventType, Roles
from app.schemas.match import MatchCreate
from app.schemas.matchevent import MatchEventCreate
from app.schemas.meeting import MeetingCreate, MeetingUpdate
from app.schemas.player import PlayerCreate, PlayerUpdate
from app.schemas.team import TeamCreate
from app.schemas.user import UserCreate, UserCreateWithRole
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
    include_middleware(application)
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


@pytest.fixture(scope="function", name="db_session")
def fixture_db_session() -> Iterator[Session]:
    """Creates a new database session for testing.

    If there's an error processing the transaction, it gets rolled back.

    Yields:
        Iterator[Session]: Database session.
    """
    Base.metadata.create_all(engine)
    transaction = None
    try:
        with engine.connect() as connection:
            with connection.begin() as transaction:
                with Session(bind=connection) as session:
                    yield session
                transaction.rollback()
    except SQLAlchemyError:
        if transaction:
            transaction.rollback()


@pytest.fixture(scope="module", name="client")
def fixture_client(app: FastAPI) -> Iterator[TestClient]:
    """Creates a new FastAPI TestClient that overrides
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
        "password": get_settings().TEST_USER_PASSWORD,
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
        "password": get_settings().TEST_USER_PASSWORD + "m",
        "role": Roles.VIEWER,
    }


user_create_unique_1 = UserCreate(
    full_name=get_settings().TEST_USER_FULL_NAME,
    email=get_settings().TEST_USER_EMAIL,
    password=get_settings().TEST_USER_PASSWORD,
)

user_create_unique_2 = UserCreate(
    full_name=get_settings().TEST_USER_FULL_NAME,
    email=get_settings().TEST_USER_EMAIL + "m",
    password=get_settings().TEST_USER_PASSWORD,
)

user_create_with_role = UserCreateWithRole(
    full_name=get_settings().TEST_USER_FULL_NAME,
    email=get_settings().TEST_USER_EMAIL + "n",
    password=get_settings().TEST_USER_PASSWORD,
    role=Roles.ADMIN,
)

meeting_create = MeetingCreate(
    user_id=1,
    name="test_name",
    notes="test_note",
    date=datetime.date.today(),
)

meeting_update = MeetingUpdate(
    name="test_name_updated",
    notes="test_note_updated",
    date=datetime.date.today() - datetime.timedelta(days=10),
)

coach_create = CoachCreate(
    user_id=1,
    date_of_birth=datetime.date.today(),
    date_of_joining=datetime.date.today(),
)

coach_update = CoachUpdate(
    date_of_birth=datetime.date.today() - datetime.timedelta(days=10),
    date_of_joining=datetime.date.today() - datetime.timedelta(days=10),
)

team_create = TeamCreate(
    coach_id=1,
    name="U21",
)

player_create = PlayerCreate(
    user_id=1,
    team_id=1,
    date_of_joining=datetime.date.today(),
    date_of_birth=datetime.date.today(),
    height=190,
    weight=90,
    notes="GOAT",
    is_injured=True,
)

player_update = PlayerUpdate(
    team_id=1,
    date_of_joining=datetime.date.today() - datetime.timedelta(days=10),
    date_of_birth=datetime.date.today() - datetime.timedelta(days=10),
    height=19,
    weight=9,
    notes="not GOAT",
    is_injured=False,
)

match_create = MatchCreate(
    team_id=1,
    opponent="test_opponent",
    is_home=True,
    notes="test_notes",
    date=datetime.date.today(),
)

matchevent_create = MatchEventCreate(
    match_id=1,
    minute=10,
    event_type=EventType.GOAL,
    description="Goal",
    is_own_event=True,
)
