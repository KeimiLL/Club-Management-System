"""File responsible for implementing matches related CRUD operations."""


from app.core.exceptions import DuplicateException, MissingException
from app.crud.crud_team import get_team_by_id
from app.models.match import Match
from app.schemas.match import MatchCreate
from sqlalchemy.exc import IntegrityError, NoResultFound, SQLAlchemyError
from sqlalchemy.orm import Session


def create_new_match(match: MatchCreate, db: Session) -> Match:
    """Creates a new match based on match data.

    Args:
        match (MatchCreate): Match based on Match schema.
        db (Session): Database session.

    Raises:
        DuplicateException: If there is already a match with the given user id.
        SQLAlchemyError: If there is a different exception.

    Returns:
        new_match (Match): Match object.
    """
    try:
        get_team_by_id(match.team_id, db)
        new_match = Match(
            team_id=match.team_id,
            opponent=match.opponent,
            is_home=match.is_home,
            goals_scored=match.goals_scored,
            goals_conceded=match.goals_conceded,
            notes=match.notes,
            date=match.date,
        )
        db.add(new_match)
        db.commit()
        db.refresh(new_match)
        return new_match
    except IntegrityError as exc:
        raise DuplicateException(Match.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def get_match_by_id(match_id: int, db: Session) -> Match:
    """Gets the match based on the given match id.

    Args:
        match_id (int): Match id.
        db (Session): Database session.

    Raises:
        MissingException: If no match matches the given match id.
        SQLAlchemyError: If there is a different exception.

    Returns:
        Match: Match object.
    """
    try:
        return db.query(Match).filter(Match.id == match_id).one()
    except NoResultFound as exc:
        raise MissingException(Match.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc
