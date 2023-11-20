"""File responsible for implementing players related CRUD operations."""


from typing import Callable

from app.core.exceptions import DuplicateException, MissingException
from app.crud.crud_team import get_team_by_id
from app.crud.crud_user import get_user_by_id
from app.models.player import Player
from app.models.user import User
from app.schemas.player import PlayerCreate
from sqlalchemy import delete, func, select
from sqlalchemy.exc import IntegrityError, NoResultFound, SQLAlchemyError
from sqlalchemy.orm import Session

func: Callable


def create_new_player(player: PlayerCreate, db: Session) -> Player:
    """Creates a new player based on player data.

    Args:
        player (PlayerCreate): Player based on Player schema.
        db (Session): Database session.

    Raises:
        DuplicateException: If there is already a player with the given user or team id.
        SQLAlchemyError: If there is a database error.

    Returns:
        new_player (Player): Player object.
    """
    try:
        get_user_by_id(player.user_id, db)
        if player.team_id is not None:
            get_team_by_id(player.team_id, db)
        new_player = Player(
            user_id=player.user_id,
            team_id=player.team_id,
            date_of_joining=player.date_of_joining,
            date_of_birth=player.date_of_birth,
            height=player.height,
            weight=player.weight,
            notes=player.notes,
            is_injured=player.is_injured,
            diet=player.diet,
        )
        db.add(new_player)
        db.commit()
        db.refresh(new_player)
        return new_player
    except IntegrityError as exc:
        raise DuplicateException(Player.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def get_player_by_user_id(user_id: int, db: Session) -> Player:
    """Gets the player based on the given user id.

    Args:
        user_id (int): User id.
        db (Session): Database session.

    Raises:
        MissingException: If no player matches the given user id.
        SQLAlchemyError: If there is a database error.

    Returns:
        Player: Player object.
    """
    try:
        return db.execute(select(Player).where(Player.user_id == user_id)).scalar_one()
    except NoResultFound as exc:
        raise MissingException(Player.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def get_all_players(db: Session) -> list[Player]:
    """Gets all players.

    Args:
        db (Session): Database session.

    Raises:
        SQLAlchemyError: If there is a database error.

    Returns:
        list[Player]: A list of all Player objects.
    """
    try:
        return list(db.scalars(select(Player)).all())
    except SQLAlchemyError as exc:
        raise exc


def get_players_with_pagination_by_team_id(
    page: int, per_page: int, team_id: int, db: Session
) -> tuple[list[Player], int]:
    """Gets all players that play in the given team.

    Args:
        page (int): The current page number.
        per_page (int): The number of items per page.
        team_id (int): The team's id.
        db (Session): Database session.

    Raises:
        SQLAlchemyError: If there is a database error.

    Returns:
        tuple[list[Player], int]: The filtered list of players alongside the total number of
            players that meet the criteria.
    """
    try:
        get_team_by_id(team_id, db)
        query = select(Player).join(User).where(Player.team_id == team_id)
        total = db.scalar(select(func.count()).select_from(query))
        return (
            list(
                db.scalars(
                    query.order_by(User.full_name.desc())
                    .offset(page * per_page)
                    .limit(per_page)
                ).all()
            ),
            total,
        )
    except SQLAlchemyError as exc:
        raise exc


def delete_player(user_id: int, db: Session) -> None:
    """Deletes the player that matches the given user id.

    Args:
        user_id (int): Player's id.
        db (Session): Database session.

    Raises:
        MissingException: If no player matches the given user id.
        SQLAlchemyError: If there is a database error.
    """
    try:
        affected_rows = db.execute(
            delete(Player).where(Player.user_id == user_id)
        ).rowcount
        if affected_rows == 0:
            raise MissingException(Player.__name__)
        db.commit()
    except SQLAlchemyError as exc:
        raise exc
