"""File responsible for implementing match_players related CRUD operations."""


from app.core.exceptions import MissingAssociationObjectException, MissingException
from app.models.match_player import MatchPlayer
from app.schemas.match_player import MatchPlayerCreate
from sqlalchemy import select
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
        MissingAssociationObjectException: If there is an IntegrityError
            while creating the record.
        SQLAlchemyError: If there is a database error.

    Returns:
        new_match_player (MatchPlayer): MatchPlayer object.
    """
    try:
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
        raise MissingAssociationObjectException(MatchPlayer.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def get_match_player_by_id(match_player_id: int, db: Session) -> MatchPlayer:
    """Gets the match_player based on the given match_player id.

    Args:
        match_player_id (int): MatchPlayer id.
        db (Session): Database session.

    Raises:
        MissingException: If no match_player matches the given match_player id.
        SQLAlchemyError: If there is a database error.

    Returns:
        MatchPlayer: MatchPlayer object.
    """
    try:
        return db.execute(
            select(MatchPlayer).where(MatchPlayer.id == match_player_id)
        ).scalar_one()
    except NoResultFound as exc:
        raise MissingException(MatchPlayer.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc
