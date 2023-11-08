"""File responsible for implementing matches related CRUD operations."""


from app.core.exceptions import DuplicateException, MissingException
from app.crud.crud_team import get_team_by_id
from app.models.match import Match
from app.models.player import Player
from app.schemas.enums import MatchEvent
from app.schemas.match import MatchCreate, MatchScore
from sqlalchemy import select, update
from sqlalchemy.exc import IntegrityError, NoResultFound, SQLAlchemyError
from sqlalchemy.orm import Session


def create_new_match(match: MatchCreate, db: Session) -> Match:
    """Creates a new match based on match data.

    Args:
        match (MatchCreate): Match based on Match schema.
        db (Session): Database session.

    Raises:
        DuplicateException: If there is already a match with the given user id.
        SQLAlchemyError: If there is a database error.

    Returns:
        new_match (Match): Match object.
    """
    try:
        get_team_by_id(match.team_id, db)
        new_match = Match(
            team_id=match.team_id,
            opponent=match.opponent,
            is_home=match.is_home,
            notes=match.notes,
            date=match.date,
        )
        db.add(new_match)
        db.commit()
        db.refresh(new_match)
        return new_match
    except IntegrityError as exc:
        raise DuplicateException(Match.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def get_match_by_id(match_id: int, db: Session) -> Match:
    """Gets the match based on the given match id.

    Args:
        match_id (int): Match id.
        db (Session): Database session.

    Raises:
        MissingException: If no match matches the given match id.
        SQLAlchemyError: If there is a database error.

    Returns:
        Match: Match object.
    """
    try:
        return db.execute(select(Match).where(Match.id == match_id)).scalar_one()
    except NoResultFound as exc:
        raise MissingException(Match.__name__) from exc
    except SQLAlchemyError as exc:
        raise exc


def create_match_with_player_ids(
    match: MatchCreate,
    player_ids: set[int],
    db: Session,
) -> Match:
    """Creates a new match and its squad based on match data and a set of player ids.

    Args:
        match (MatchCreate): Match based on Match schema.
        player_ids (set[int]): Player ids to be added.
        db (Session): Database session.

    Raises:
        MissingException: If any of the provided player ids does not match an existing player that
            plays for a team with the given id.
        SQLAlchemyError: If there is a database error.

    Returns:
        Match: The created match.
    """
    try:
        get_team_by_id(team_id=match.team_id, db=db)
        players = list(
            db.scalars(
                select(Player).where(
                    (Player.team_id == match.team_id) & (Player.user_id.in_(player_ids))
                )
            ).all()
        )
        if not players or len(players) != len(player_ids):
            raise MissingException(Player.__name__)
        new_match = create_new_match(
            match=match,
            db=db,
        )
        new_match.players = players
        db.commit()
        return new_match
    except SQLAlchemyError as exc:
        raise exc


def update_match_state(
    match_event: MatchEvent,
    match_id: int,
    db: Session,
) -> Match:
    """Starts or ends a match with the given id.

    Args:
        match_event (MatchEvent): The type of match event to be handled.
        match_id (int): Match's id.
        db (Session): Database session.

    Raises:
        SQLAlchemyError: If there is a database error.

    Returns:
        Match: The updated match.
    """
    try:
        match = get_match_by_id(match_id=match_id, db=db)
        if match_event is MatchEvent.START:
            match_update = {
                "has_started": True,
                "goals_scored": 0,
                "goals_conceded": 0,
            }
        else:
            match_update = {
                "has_ended": True,
            }
        db.execute(update(Match).where(Match.id == match_id).values(**match_update))
        db.commit()
        return match
    except SQLAlchemyError as exc:
        raise exc


def update_match_score(
    match_score: MatchScore,
    match_id: int,
    db: Session,
) -> Match:
    """Updates the score of the match with the given id.

    Args:
        match_score (MatchScore): Match score to be set.
        match_id (int): Match's id.
        db (Session): Database session.

    Raises:
        SQLAlchemyError: If there is a database error.

    Returns:
        Match: The updated match.
    """
    try:
        match = get_match_by_id(match_id=match_id, db=db)
        db.execute(
            update(Match).where(Match.id == match_id).values(**match_score.__dict__)
        )
        db.commit()
        return match
    except SQLAlchemyError as exc:
        raise exc


def get_matches_in_progress_with_limit(limit: int | None, db: Session) -> list[Match]:
    """Gets all matches in progress, optionally limited by a given limit.

    Args:
        limit (int | None): The maximum number of requested matches.
        db (Session): Database session.

    Raises:
        SQLAlchemyError: If there is a database error.

    Returns:
        list[Match]: The list of all matches in progress, optionally limited.
    """
    try:
        query = select(Match).where(
            (Match.has_started == True)  # pylint: disable=singleton-comparison
            & (Match.has_ended == False)  # pylint: disable=singleton-comparison
        )
        return list(db.scalars(query.order_by(Match.id.asc()).limit(limit)).all())
    except SQLAlchemyError as exc:
        raise exc
