"""File responsible for implementing matches related CRUD operations."""


from app.core.exceptions import DuplicateException, MissingException
from app.crud.crud_team import get_team_by_id
from app.models.match import Match
from app.models.player import Player
from app.schemas.match import MatchCreate
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError, NoResultFound, SQLAlchemyError
from sqlalchemy.orm import Session


def create_new_match(match: MatchCreate, db: Session) -> Match:
    """Creates a new match based on match data.

    Args:
        match (MatchCreate): Match based on Match schema.
        db (Session): Database session.

    Raises:
        DuplicateException: If there is already a match with the given user id.
        SQLAlchemyError: If there is a database error.

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
        SQLAlchemyError: If there is a database error.

    Returns:
        Match: Match object.
    """
    try:
        return db.execute(select(Match).where(Match.id == match_id)).scalar_one()
    except NoResultFound as exc:
        raise MissingException(Match.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def create_match_with_player_ids(
    match: MatchCreate,
    player_ids: set[int],
    db: Session,
) -> Match:
    """Creates a new match and its squad based on match data and a set of player ids.

    Args:
        match (MatchCreate): Match based on Match schema.
        player_ids (set[int]): Player ids to be added.
        db (Session): Database session.

    Raises:
        MissingException: If any of the provided player ids does not match an existing player that
            plays for a team with the given id.
        SQLAlchemyError: If there is a database error.

    Returns:
        Match: The created match.
    """
    try:
        get_team_by_id(team_id=match.team_id, db=db)
        players = list(
            db.scalars(
                select(Player).where(
                    (Player.team_id == match.team_id) & (Player.user_id.in_(player_ids))
                )
            ).all()
        )
        if not players or len(players) != len(player_ids):
            raise MissingException(Player.__name__)
        new_match = create_new_match(
            match=match,
            db=db,
        )
        new_match.players = players
        db.commit()
        return new_match
    except SQLAlchemyError as exc:
        raise exc
