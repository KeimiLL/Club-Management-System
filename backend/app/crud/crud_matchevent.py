"""File responsible for implementing matchevents related CRUD operations."""


from app.core.exceptions import MissingException
from app.crud.crud_match import get_match_by_id
from app.models.matchevent import MatchEvent
from app.schemas.matchevent import MatchEventCreate
from sqlalchemy import select
from sqlalchemy.exc import NoResultFound, SQLAlchemyError
from sqlalchemy.orm import Session


def create_new_matchevent(matchevent: MatchEventCreate, db: Session) -> MatchEvent:
    """Creates a new matchevent based on matchevent data.

    Args:
        matchevent (MatchEventCreate): MatchEvent based on MatchEvent schema.
        db (Session): Database session.

    Raises:
        SQLAlchemyError: If there is a database error.

    Returns:
        new_matchevent (MatchEvent): MatchEvent object.
    """
    try:
        get_match_by_id(matchevent.match_id, db)
        new_matchevent = MatchEvent(
            match_id=matchevent.match_id,
            minute=matchevent.minute,
            event_type=matchevent.event_type,
            description=matchevent.description,
        )
        db.add(new_matchevent)
        db.commit()
        db.refresh(new_matchevent)
        return new_matchevent
    except SQLAlchemyError as exc:
        raise exc


def get_matchevent_by_id(matchevent_id: int, db: Session) -> MatchEvent:
    """Gets the matchevent based on the given user id.

    Args:
        matchevent_id (int): MatchEvent id.
        db (Session): Database session.

    Raises:
        MissingException: If no matchevent matches the given matchevent id.
        SQLAlchemyError: If there is a database error.

    Returns:
        MatchEvent: MatchEvent object.
    """
    try:
        return db.execute(
            select(MatchEvent).where(MatchEvent.id == matchevent_id)
        ).scalar_one()
    except NoResultFound as exc:
        raise MissingException(MatchEvent.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc
