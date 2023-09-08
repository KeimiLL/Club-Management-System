"""File responsible for implementing match_playeres related CRUD operations."""


from app.core.exceptions import DuplicateException, MissingException
from app.crud.crud_match import get_match_by_id
from app.crud.crud_player import get_player_by_user_id
from app.models.match_player import MatchPlayer
from app.schemas.match_player import MatchPlayerCreate
from sqlalchemy.exc import IntegrityError, NoResultFound, SQLAlchemyError
from sqlalchemy.orm import Session


def create_new_match_player(
    match_player: MatchPlayerCreate, db: Session
) -> MatchPlayer:
    """Creates a new match_player based on match_player data.

    Args:
        match_player (MatchPlayerCreate): MatchPlayer based on MatchPlayer schema.
        db (Session): Database session.

    Raises:
        DuplicateException: If there is already a match_player with the given user id.
        SQLAlchemyError: If there is a different exception.

    Returns:
        new_match_player (MatchPlayer): MatchPlayer object.
    """
    try:
        get_match_by_id(match_player.match_id, db)
        get_player_by_user_id(match_player.player_id, db)
        new_match_player = MatchPlayer(
            match_id=match_player.match_id,
            player_id=match_player.player_id,
            is_starter=match_player.is_starter,
            minutes_played=match_player.minutes_played,
            rating=match_player.rating,
        )
        db.add(new_match_player)
        db.commit()
        db.refresh(new_match_player)
        return new_match_player
    except IntegrityError as exc:
        raise DuplicateException(MatchPlayer.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def get_match_player_by_id(match_player_id: int, db: Session) -> MatchPlayer:
    """Gets the match_player based on the given match_player id.

    Args:
        match_player_id (int): MatchPlayer id.
        db (Session): Database session.

    Raises:
        MissingException: If no match_player matches the given match_player id.
        SQLAlchemyError: If there is a different exception.

    Returns:
        MatchPlayer: MatchPlayer object.
    """
    try:
        return db.query(MatchPlayer).filter(MatchPlayer.id == match_player_id).one()
    except NoResultFound as exc:
        raise MissingException(MatchPlayer.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc
