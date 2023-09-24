"""File responsible for implementing coaches related CRUD operations."""


from app.core.exceptions import DuplicateException, MissingException
from app.crud.crud_user import get_user_by_id
from app.models.coach import Coach
from app.schemas.coach import CoachCreate
from sqlalchemy import select
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
