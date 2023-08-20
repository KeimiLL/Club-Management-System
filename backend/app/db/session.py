"""File responsible for setting up the database connection."""


from typing import Iterator

from app.core.config import get_settings
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

SQL_ALCHEMY_DATABASE_URL = get_settings().db_uri
engine = create_engine(SQL_ALCHEMY_DATABASE_URL)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Iterator[Session]:
    """Function responsible for creating a database connection."""
    try:
        db = SessionLocal()
        yield db
    except Exception as exc:
        raise exc
    db.close()
