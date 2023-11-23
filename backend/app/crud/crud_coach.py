"""File responsible for implementing coaches related CRUD operations."""


from app.core.exceptions import DuplicateException, MissingException
from app.crud.crud_user import get_user_by_id
from app.models.coach import Coach
from app.models.team import Team
from app.schemas.coach import CoachCreate, CoachUpdate
from sqlalchemy import delete, select, update
from sqlalchemy.exc import IntegrityError, NoResultFound, SQLAlchemyError
from sqlalchemy.orm import Session


def create_new_coach(coach: CoachCreate, db: Session) -> Coach:
    """Creates a new coach based on coach data.

    Args:
        coach (CoachCreate): Coach based on Coach schema.
        db (Session): Database session.

    Raises:
        DuplicateException: If there is already a coach with the given user id.
        SQLAlchemyError: If there is a database error.

    Returns:
        new_coach (Coach): Coach object.
    """
    try:
        get_user_by_id(coach.user_id, db)
        new_coach = Coach(
            user_id=coach.user_id,
            date_of_joining=coach.date_of_joining,
            date_of_birth=coach.date_of_birth,
        )
        db.add(new_coach)
        db.commit()
        db.refresh(new_coach)
        return new_coach
    except IntegrityError as exc:
        raise DuplicateException(Coach.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def get_coach_by_user_id(user_id: int, db: Session) -> Coach:
    """Gets the coach based on the given user id.

    Args:
        user_id (int): User id.
        db (Session): Database session.

    Raises:
        MissingException: If no coach matches the given user id.
        SQLAlchemyError: If there is a database error.

    Returns:
        Coach: Coach object.
    """
    try:
        return db.execute(select(Coach).where(Coach.user_id == user_id)).scalar_one()
    except NoResultFound as exc:
        raise MissingException(Coach.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def get_all_coaches(db: Session) -> list[Coach]:
    """Gets all coaches.

    Args:
        db (Session): Database session.

    Raises:
        SQLAlchemyError: If there is a database error.

    Returns:
        list[Coach]: A list of all Coach objects.
    """
    try:
        return list(db.scalars(select(Coach)).all())
    except SQLAlchemyError as exc:
        raise exc


def get_coach_by_team_id(team_id: int, db: Session) -> Coach | None:
    """Gets the coach that is assigned to the given team.

    Args:
        team_id (int): The team's id.
        db (Session): Database session.

    Raises:
        MissingException: If the requested team does not exist.
        SQLAlchemyError: If there is a database error.

    Returns:
        Coach | None: The team's coach if it was assigned to a team.
    """
    try:
        try:
            db.execute(select(Team).where(Team.id == team_id)).scalar_one()
        except NoResultFound as exc:
            raise MissingException(Team.__name__) from exc
        query = select(Coach).join(Team).where(Team.id == team_id)
        return db.execute(query).scalar_one_or_none()
    except SQLAlchemyError as exc:
        raise exc


def delete_coach(user_id: int, db: Session) -> None:
    """Deletes the coach that matches the given user id.

    Args:
        user_id (int): Coach's id.
        db (Session): Database session.

    Raises:
        MissingException: If no coach matches the given user id.
        SQLAlchemyError: If there is a database error.
    """
    try:
        affected_rows = db.execute(
            delete(Coach).where(Coach.user_id == user_id)
        ).rowcount
        if affected_rows == 0:
            raise MissingException(Coach.__name__)
        db.commit()
    except SQLAlchemyError as exc:
        raise exc


def update_coach(
    coach_update: CoachUpdate,
    user_id: int,
    db: Session,
) -> Coach:
    """Updates coach data with the given data.

    Args:
        coach_update (CoachUpdate): Coach data to update.
        user_id (int): Coach's id.
        db (Session): Database session.

    Raises:
        MissingException: If no coach matches the given user id.
        SQLAlchemyError: If there is a database error.

    Returns:
        Coach: The updated Coach object.
    """
    try:
        coach = get_coach_by_user_id(user_id=user_id, db=db)
        db.execute(
            update(Coach)
            .where(Coach.user_id == user_id)
            .values(**coach_update.__dict__)
        )
        db.commit()
        return coach
    except NoResultFound as exc:
        raise MissingException(Coach.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc
