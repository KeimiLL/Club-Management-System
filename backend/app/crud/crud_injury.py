"""File responsible for implementing injuries related CRUD operations."""


from app.core.exceptions import DuplicateException, MissingException
from app.crud.crud_user import get_user_by_id
from app.models.injury import Injury
from app.schemas.injury import InjuryCreate
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError, NoResultFound, SQLAlchemyError
from sqlalchemy.orm import Session


def create_new_injury(injury: InjuryCreate, db: Session) -> Injury:
    """Creates a new injury based on injury data.

    Args:
        injury (InjuryCreate): Injury based on Injury schema.
        db (Session): Database session.

    Raises:
        DuplicateException: If there is already an injury with the given id.
        SQLAlchemyError: If there is a database error.

    Returns:
        new_injury (Injury): Injury object.
    """
    try:
        get_user_by_id(injury.player_id, db)
        new_injury = Injury(
            player_id=injury.player_id,
            injury_type=injury.injury_type,
            prescriptions=injury.prescriptions,
        )
        db.add(new_injury)
        db.commit()
        db.refresh(new_injury)
        return new_injury
    except IntegrityError as exc:
        raise DuplicateException(Injury.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def get_injury_by_id(injury_id: int, db: Session) -> Injury:
    """Gets the injury based on the given user id.

    Args:
        injury_id (int): Injury id.
        db (Session): Database session.

    Raises:
        MissingException: If no injury matches the given injury id.
        SQLAlchemyError: If there is a database error.

    Returns:
        Injury: Injury object.
    """
    try:
        return db.execute(select(Injury).where(Injury.id == injury_id)).scalar_one()
    except NoResultFound as exc:
        raise MissingException(Injury.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc
