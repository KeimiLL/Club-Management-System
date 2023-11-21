"""File responsible for implementing teams related CRUD operations."""


from typing import Callable

from app.core.exceptions import DuplicateException, MissingException
from app.crud.crud_coach import get_coach_by_user_id
from app.models.player import Player
from app.models.team import Team
from app.schemas.team import TeamCreate
from sqlalchemy import delete, func, select
from sqlalchemy.exc import IntegrityError, NoResultFound, SQLAlchemyError
from sqlalchemy.orm import Session

func: Callable


def create_new_team(team: TeamCreate, db: Session) -> Team:
    """Creates a new team based on team data.

    Args:
        team (TeamCreate): Team based on Team schema.
        db (Session): Database session.

    Raises:
        DuplicateException: If there is already a team with the given coach id.
        SQLAlchemyError: If there is a database error.

    Returns:
        new_team (Team): Team object.
    """
    try:
        if team.coach_id is not None:
            get_coach_by_user_id(team.coach_id, db)
        new_team = Team(
            coach_id=team.coach_id,
            name=team.name,
        )
        db.add(new_team)
        db.commit()
        db.refresh(new_team)
        return new_team
    except IntegrityError as exc:
        raise DuplicateException(Team.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def get_team_by_id(team_id: int, db: Session) -> Team:
    """Gets the team based on the given team id.

    Args:
        team_id (int): Team id.
        db (Session): Database session.

    Raises:
        MissingException: If no team matches the given team id.
        SQLAlchemyError: If there is a database error.

    Returns:
        Team: Team object.
    """
    try:
        return db.execute(select(Team).where(Team.id == team_id)).scalar_one()
    except NoResultFound as exc:
        raise MissingException(Team.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def get_all_teams(db: Session) -> list[Team]:
    """Gets all teams.

    Args:
        db (Session): Database session.

    Raises:
        SQLAlchemyError: If there is a database error.

    Returns:
        list[Team]: A list of all Team objects.
    """
    try:
        return list(db.scalars(select(Team)).all())
    except SQLAlchemyError as exc:
        raise exc


def get_all_teams_with_pagination(
    page: int,
    per_page: int,
    db: Session,
) -> tuple[list[Team], int]:
    """Gets all teams with pagination.

    Args:
        page (int): The current page number.
        per_page (int): The number of items per page.
        db (Session): Database session.

    Raises:
        SQLAlchemyError: If there is a database error.

    Returns:
        tuple[list[Team], int]: The list of all teams alongside the total number of them.
    """
    try:
        query = select(Team)
        total = db.scalar(select(func.count()).select_from(query))
        return (
            list(
                db.scalars(
                    query.order_by(Team.name.desc())
                    .offset(page * per_page)
                    .limit(per_page)
                ).all()
            ),
            total,
        )
    except SQLAlchemyError as exc:
        raise exc


def get_teams_with_pagination_by_coach_id(
    page: int, per_page: int, user_id: int, db: Session
) -> tuple[list[Team], int]:
    """Gets all teams that are coached by the coach with the given user id with pagination.

    Args:
        page (int): The current page number.
        per_page (int): The number of items per page.
        user_id (int): The current user's id.
        db (Session): Database session.

    Raises:
        SQLAlchemyError: If there is a database error.

    Returns:
        tuple[list[Team], int]: The filtered list of teams alongside the total number of
            teams that meet the criteria.
    """
    try:
        query = select(Team).where(Team.coach_id == user_id)
        total = db.scalar(select(func.count()).select_from(query))
        return (
            list(
                db.scalars(
                    query.order_by(Team.name.desc())
                    .offset(page * per_page)
                    .limit(per_page)
                ).all()
            ),
            total,
        )
    except SQLAlchemyError as exc:
        raise exc


def create_team_with_player_ids(
    team: TeamCreate,
    player_ids: set[int],
    db: Session,
) -> Team:
    """Creates a new team and attaches players to it based on team data and a set of player ids.

    Args:
        team (TeamCreate): Team based on Team schema.
        player_ids (set[int]): Player ids to be added.
        db (Session): Database session.

    Raises:
        MissingException: If any of the provided player ids does not match an existing player.
        SQLAlchemyError: If there is a database error.

    Returns:
        Team: The created team.
    """
    try:
        players = list(
            db.scalars(select(Player).where(Player.user_id.in_(player_ids))).all()
        )
        if len(players) != len(player_ids):
            raise MissingException(Player.__name__)
        new_team = create_new_team(
            team=team,
            db=db,
        )
        new_team.players = players
        db.commit()
        return new_team
    except SQLAlchemyError as exc:
        raise exc


def get_all_teams_by_coach_id(user_id: int, db: Session) -> list[Team]:
    """Gets all teams that are coached by the coach with the given user id.

    Args:
        user_id (int): The current user's id.
        db (Session): Database session.

    Raises:
        SQLAlchemyError: If there is a database error.

    Returns:
        list[Team]: The filtered list of teams that meet the criteria.
    """
    try:
        query = select(Team).where(Team.coach_id == user_id)
        return list(db.scalars(query.order_by(Team.name.desc())).all())
    except SQLAlchemyError as exc:
        raise exc


def delete_team(team_id: int, db: Session) -> None:
    """Deletes the team that matches the given id.

    Args:
        team_id (int): Teams's id.
        db (Session): Database session.

    Raises:
        MissingException: If no team matches the given id.
        SQLAlchemyError: If there is a database error.
    """
    try:
        affected_rows = db.execute(delete(Team).where(Team.id == team_id)).rowcount
        if affected_rows == 0:
            raise MissingException(Team.__name__)
        db.commit()
    except SQLAlchemyError as exc:
        raise exc
