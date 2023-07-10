"""File to run before starting the API app."""


import logging
from sqlalchemy import select

from tenacity import after_log, before_log, retry, stop_after_attempt, wait_fixed

from app.db.session import SessionLocal


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MAX_TRIES = 60 * 5  # 5 minutes
WAIT_SECONDS = 1


@retry(
    stop=stop_after_attempt(MAX_TRIES),
    wait=wait_fixed(WAIT_SECONDS),
    before=before_log(logger, logging.INFO),
    after=after_log(logger, logging.WARN),
)
def init() -> None:
    """Checks if the database is awake and ready to accept connections.

    Raises:
        Exception: Exception if there was an error trying to connect to the database.
    """
    try:
        db = SessionLocal()
        # Try to create session to check if DB is awake
        db.execute(select(1))
    except Exception as exc:
        logger.error(exc)
        raise exc


def main() -> None:
    """Main function to start when the script is called."""
    logger.info("Initializing service")
    init()
    logger.info("Service finished initializing")


if __name__ == "__main__":
    main()
