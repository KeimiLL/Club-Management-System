"""File responsible for implementing teams related CRUD operations."""


from app.core.exceptions import DuplicateException, MissingException
from app.crud.crud_coach import get_coach_by_user_id
from app.models.team import Team
from app.schemas.team import TeamCreate, TeamInDBBase
from sqlalchemy.exc import IntegrityError, NoResultFound, SQLAlchemyError
from sqlalchemy.orm import Session


def create_new_team(team: TeamCreate, db: Session) -> Team:
    """Creates a new team based on team data.

    Args:
        team (TeamCreate): Team based on Team schema.
        db (Session): Database session.

    Raises:
        DuplicateException: If there is already a team with the given coach id.
        SQLAlchemyError: If there is a different exception.

    Returns:
        new_team (Team): Team object.
    """
    try:
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


def get_team_by_id(team_id: int, db: Session) -> TeamInDBBase:
    """Gets the team based on the given team id.

    Args:
        team_id (int): Team id.
        db (Session): Database session.

    Raises:
        MissingException: If no team matches the given team id.
        SQLAlchemyError: If there is a different exception.

    Returns:
        TeamInDB: Team object.
    """
    try:
        return db.query(Team).filter(Team.id == team_id).one()
    except NoResultFound as exc:
        raise MissingException(Team.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc
