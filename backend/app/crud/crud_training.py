"""File responsible for implementing traininges related CRUD operations."""


from app.core.exceptions import DuplicateException, MissingException
from app.crud.crud_team import get_team_by_id
from app.models.training import Training
from app.schemas.training import TrainingCreate
from sqlalchemy.exc import IntegrityError, NoResultFound, SQLAlchemyError
from sqlalchemy.orm import Session


def create_new_training(training: TrainingCreate, db: Session) -> Training:
    """Creates a new training based on training data.

    Args:
        training (TrainingCreate): Training based on Training schema.
        db (Session): Database session.

    Raises:
        DuplicateException: If there is already a training with the given id.
        SQLAlchemyError: If there is a different exception.

    Returns:
        new_training (Training): Training object.
    """
    try:
        get_team_by_id(training.team_id, db)
        new_training = Training(
            team_id=training.team_id,
            notes=training.notes,
            date=training.date,
        )
        db.add(new_training)
        db.commit()
        db.refresh(new_training)
        return new_training
    except IntegrityError as exc:
        raise DuplicateException(Training.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def get_training_by_id(training_id: int, db: Session) -> Training:
    """Gets the training based on the given training id.

    Args:
        training_id (int): Training id.
        db (Session): Database session.

    Raises:
        MissingException: If no training matches the given training id.
        SQLAlchemyError: If there is a different exception.

    Returns:
        Training: Training object.
    """
    try:
        return db.query(Training).filter(Training.id == training_id).one()
    except NoResultFound as exc:
        raise MissingException(Training.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc
