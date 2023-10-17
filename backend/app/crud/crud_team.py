"""File responsible for implementing teams related CRUD operations."""


from typing import Callable

from app.core.exceptions import DuplicateException, MissingException
from app.crud.crud_coach import get_coach_by_user_id
from app.models.team import Team
from app.schemas.team import TeamCreate
from sqlalchemy import func, select
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
