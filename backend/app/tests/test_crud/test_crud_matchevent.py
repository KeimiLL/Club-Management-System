"""File for testing matchevents CRUD operations."""


import pytest
from app.core.exceptions import MissingException
from app.crud.crud_coach import create_new_coach
from app.crud.crud_match import create_new_match
from app.crud.crud_matchevent import (
    create_new_matchevent,
    get_all_matchevents_by_match_id,
    get_matchevent_by_id,
)
from app.crud.crud_team import create_new_team
from app.crud.crud_user import create_new_user
from app.schemas.coach import CoachCreate
from app.schemas.match import MatchCreate
from app.schemas.matchevent import MatchEventCreate
from app.schemas.team import TeamCreate
from app.schemas.user import UserCreate
from app.tests.conftest import (
    coach_create,
    match_create,
    matchevent_create,
    team_create,
    user_create_unique_1,
)
from sqlalchemy.orm import Session


@pytest.mark.parametrize(
    "user,coach,team,match,matchevent",
    [
        (
            user_create_unique_1,
            coach_create,
            team_create,
            match_create,
            matchevent_create,
        )
    ],
)
def test_correct__create_new_matchevent(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    match: MatchCreate,
    matchevent: MatchEventCreate,
    db_session: Session,
) -> None:
    """Tests creating a matchevent.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        match (MatchCreate): Match to be created.
        matchevent (MatchEventCreate): MatchEvent to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    create_new_match(match, db_session)
    new_matchevent = create_new_matchevent(matchevent, db_session)
    assert new_matchevent.minute == matchevent.minute
    assert new_matchevent.description == matchevent.description
    assert new_matchevent.event_type == matchevent.event_type
    assert new_matchevent.is_own_event == matchevent.is_own_event


@pytest.mark.parametrize(
    "user,coach,team,match,matchevent",
    [
        (
            user_create_unique_1,
            coach_create,
            team_create,
            match_create,
            matchevent_create,
        )
    ],
)
def test_correct__get_matchevent_by_user_id(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    match: MatchCreate,
    matchevent: MatchEventCreate,
    db_session: Session,
) -> None:
    """Tests getting a matchevent by id.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        match (MatchCreate): Match to be created.
        matchevent (MatchEventCreate): MatchEvent to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    create_new_match(match, db_session)
    new_matchevent = create_new_matchevent(matchevent, db_session)
    matchevent_user_by_id = get_matchevent_by_id(new_matchevent.id, db_session)
    assert matchevent_user_by_id.minute == matchevent.minute
    assert matchevent_user_by_id.description == matchevent.description
    assert matchevent_user_by_id.event_type == matchevent.event_type
    assert matchevent_user_by_id.is_own_event == matchevent.is_own_event


@pytest.mark.parametrize(
    "matchevent_id",
    [0, 1000000],
)
def test_incorrect__get_matchevent_by_user_id(
    matchevent_id: int,
    db_session: Session,
) -> None:
    """Tests getting a missing matchevent by id.

    Args:
        matchevent_id (int): MatchEvent id to be read.
        db_session (Session): Database session.
    """
    with pytest.raises(MissingException) as excinfo:
        get_matchevent_by_id(matchevent_id, db_session)
    assert "MatchEvent" == str(excinfo.value)


@pytest.mark.parametrize(
    "user,coach,team,match,matchevent",
    [
        (
            user_create_unique_1,
            coach_create,
            team_create,
            match_create,
            matchevent_create,
        )
    ],
)
def test_correct__get_all_matchevents_by_match_id(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    match: MatchCreate,
    matchevent: MatchEventCreate,
    db_session: Session,
) -> None:
    """Tests creating a matchevent.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        match (MatchCreate): Match to be created.
        matchevent (MatchEventCreate): MatchEvent to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    new_match = create_new_match(match, db_session)
    for index in range(3):
        create_new_matchevent(
            matchevent.model_copy(update={"minute": index}), db_session
        )
    matchevents_by_match_id = get_all_matchevents_by_match_id(new_match.id, db_session)
    for index, matchevent_by_match_id in enumerate(reversed(matchevents_by_match_id)):
        assert matchevent_by_match_id.minute == index
        assert matchevent_by_match_id.description == matchevent.description
        assert matchevent_by_match_id.event_type == matchevent.event_type
        assert matchevent_by_match_id.is_own_event == matchevent.is_own_event
