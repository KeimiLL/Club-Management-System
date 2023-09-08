"""File responsible for implementing training_playeres related CRUD operations."""


from app.core.exceptions import DuplicateException, MissingException
from app.crud.crud_player import get_player_by_user_id
from app.crud.crud_training import get_training_by_id
from app.models.training_player import TrainingPlayer
from app.schemas.training_player import TrainingPlayerCreate
from sqlalchemy.exc import IntegrityError, NoResultFound, SQLAlchemyError
from sqlalchemy.orm import Session


def create_new_training_player(
    training_player: TrainingPlayerCreate, db: Session
) -> TrainingPlayer:
    """Creates a new training_player based on training_player data.

    Args:
        training_player (TrainingPlayerCreate): TrainingPlayer based on TrainingPlayer schema.
        db (Session): Database session.

    Raises:
        DuplicateException: If there is already a training_player with the given user id.
        SQLAlchemyError: If there is a different exception.

    Returns:
        new_training_player (TrainingPlayer): TrainingPlayer object.
    """
    try:
        get_training_by_id(training_player.training_id, db)
        get_player_by_user_id(training_player.player_id, db)
        new_training_player = TrainingPlayer(
            training_id=training_player.training_id,
            player_id=training_player.player_id,
            presence=training_player.presence,
        )
        db.add(new_training_player)
        db.commit()
        db.refresh(new_training_player)
        return new_training_player
    except IntegrityError as exc:
        raise DuplicateException(TrainingPlayer.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def get_training_player_by_id(training_player_id: int, db: Session) -> TrainingPlayer:
    """Gets the training_player based on the given training_player id.

    Args:
        training_player_id (int): TrainingPlayer id.
        db (Session): Database session.

    Raises:
        MissingException: If no training_player matches the given training_player id.
        SQLAlchemyError: If there is a different exception.

    Returns:
        TrainingPlayer: TrainingPlayer object.
    """
    try:
        return (
            db.query(TrainingPlayer)
            .filter(TrainingPlayer.id == training_player_id)
            .one()
        )
    except NoResultFound as exc:
        raise MissingException(TrainingPlayer.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc
