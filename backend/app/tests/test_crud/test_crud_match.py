"""File for testing match CRUD operations."""


import itertools

import pytest
from app.core.exceptions import MissingException
from app.crud.crud_coach import create_new_coach
from app.crud.crud_match import (
    create_match_with_player_ids,
    create_new_match,
    delete_match,
    get_match_by_id,
    get_matches_in_progress_with_limit,
    get_matches_with_pagination_by_team_id,
    update_match_score,
    update_match_state,
    update_match_with_player_ids,
)
from app.crud.crud_player import create_new_player
from app.crud.crud_team import create_new_team
from app.crud.crud_user import create_new_user
from app.schemas.coach import CoachCreate
from app.schemas.enums import MatchEvent
from app.schemas.match import MatchCreate, MatchScore, MatchUpdate
from app.schemas.player import PlayerCreate
from app.schemas.team import TeamCreate
from app.schemas.user import UserCreate
from app.tests.conftest import (
    coach_create,
    match_create,
    match_update,
    player_create,
    team_create,
    user_create_unique_1,
    user_create_unique_2,
    user_create_with_role,
)
from sqlalchemy.orm import Session


@pytest.mark.parametrize(
    "user,coach,team,match",
    [(user_create_unique_1, coach_create, team_create, match_create)],
)
def test_correct__create_new_match(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    match: MatchCreate,
    db_session: Session,
) -> None:
    """Tests creating a match.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        match (MatchCreate): Match to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    new_match = create_new_match(match, db_session)
    assert new_match.notes == match.notes
    assert new_match.date == match.date
    assert new_match.has_started is False
    assert new_match.team.name == team.name
    if new_match.team.coach is not None:
        assert new_match.team.coach.date_of_birth == coach.date_of_birth


@pytest.mark.parametrize(
    "user,coach,team,match",
    [(user_create_unique_1, coach_create, team_create, match_create)],
)
def test_correct__get_match_by_id(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    match: MatchCreate,
    db_session: Session,
) -> None:
    """Tests getting a match by id.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        match (MatchCreate): Match to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    new_match = create_new_match(match, db_session)
    match_by_id = get_match_by_id(new_match.id, db_session)
    assert match_by_id.notes == match.notes
    assert match_by_id.date == match.date
    assert new_match.has_started is False
    assert match_by_id.team.name == team.name
    if match_by_id.team.coach is not None:
        assert match_by_id.team.coach.date_of_birth == coach.date_of_birth


@pytest.mark.parametrize(
    "match_id",
    [0, 1000000],
)
def test_incorrect__get_match_by_id(
    match_id: int,
    db_session: Session,
) -> None:
    """Tests getting a missing match by id.

    Args:
        match_id (int): Match id to be read.
        db_session (Session): Database session.
    """
    with pytest.raises(MissingException) as excinfo:
        get_match_by_id(match_id, db_session)
    assert "Match" == str(excinfo.value)


@pytest.mark.parametrize(
    "user,coach,team,player,match,player_ids",
    [
        (
            user_create_unique_1,
            coach_create,
            team_create,
            player_create,
            match_create,
            [1],
        )
    ],
)
def test_correct__create_match_with_player_ids(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    player: PlayerCreate,
    match: MatchCreate,
    player_ids: list[int],
    db_session: Session,
) -> None:
    """Tests creating a match_player with a list of user ids.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        player (PlayerCreate): Player to be created.
        match (MatchCreate): Match to be created.
        player_ids (list[int]): A list of player_ids to be added to the match.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    create_new_player(player, db_session)
    new_match = create_match_with_player_ids(match, player_ids, db_session)
    assert new_match.notes == match.notes
    assert new_match.date == match.date
    assert new_match.has_started is False
    assert new_match.team.name == team.name
    if new_match.team.coach is not None:
        assert new_match.team.coach.date_of_birth == coach.date_of_birth
    assert new_match.players[0].date_of_birth == player.date_of_birth
    assert new_match.players[0].user.full_name == user.full_name


@pytest.mark.parametrize(
    "user,coach,team,player,match,player_ids",
    [
        (
            user_create_unique_1,
            coach_create,
            team_create,
            player_create,
            match_create,
            [1, 2],
        ),
        (
            user_create_unique_1,
            coach_create,
            team_create,
            player_create,
            match_create,
            [2, 3],
        ),
    ],
)
def test_incorrect__create_match_with_user_ids(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    player: PlayerCreate,
    match: MatchCreate,
    player_ids: list[int],
    db_session: Session,
) -> None:
    """Tests trying to create a match with a list of user ids.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        player (PlayerCreate): Player to be created.
        match (MatchCreate): Match to be created.
        player_ids (list[int]): A list of player_ids to be added to the match.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    create_new_player(player, db_session)
    with pytest.raises(MissingException):
        create_match_with_player_ids(match, player_ids, db_session)


@pytest.mark.parametrize(
    "user,coach,team,match,match_events",
    [
        (user_create_unique_1, coach_create, team_create, match_create, []),
        (
            user_create_unique_1,
            coach_create,
            team_create,
            match_create,
            [MatchEvent.START],
        ),
        (
            user_create_unique_1,
            coach_create,
            team_create,
            match_create,
            [MatchEvent.START, MatchEvent.END],
        ),
    ],
)
def test_correct__update_match_state(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    match: MatchCreate,
    match_events: list[MatchEvent],
    db_session: Session,
) -> None:
    """Tests updating match state.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        match (MatchCreate): Match to be created.
        match_events: list[MatchEvent]: The list of match events to be set.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    new_match = create_new_match(match, db_session)
    for match_event in match_events:
        update_match_state(match_event, new_match.id, db_session)
    match_by_id = get_match_by_id(new_match.id, db_session)
    assert match_by_id.notes == match.notes
    assert match_by_id.date == match.date
    assert new_match.has_started is (MatchEvent.START in match_events)
    assert new_match.has_ended is (MatchEvent.END in match_events)
    if new_match.has_started:
        assert new_match.goals_scored == 0
        assert new_match.goals_conceded == 0


@pytest.mark.parametrize(
    "user,coach,team,match,goals_scored,goals_conceded",
    [
        (user_create_unique_1, coach_create, team_create, match_create, [0], [1]),
        (user_create_unique_1, coach_create, team_create, match_create, [1], [0]),
        (user_create_unique_1, coach_create, team_create, match_create, [1, 2], [0]),
        (user_create_unique_1, coach_create, team_create, match_create, [0, 1], [1, 2]),
        (user_create_unique_1, coach_create, team_create, match_create, [1, 2], [0, 1]),
        (
            user_create_unique_1,
            coach_create,
            team_create,
            match_create,
            [0, 1, 2],
            [1, 2],
        ),
        (
            user_create_unique_1,
            coach_create,
            team_create,
            match_create,
            [1, 2],
            [0, 1, 2],
        ),
    ],
)
def test_correct__update_match_score(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    match: MatchCreate,
    goals_scored: list[int],
    goals_conceded: list[int],
    db_session: Session,
) -> None:
    """Tests updating match score.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        match (MatchCreate): Match to be created.
        goals_scored (list[int]): Goals scored to be set.
        goals_conceded (list[int]): Goals conceded to be set.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    new_match = create_new_match(match, db_session)
    update_match_state(MatchEvent.START, new_match.id, db_session)
    for goal_scored, goal_conceded in itertools.product(goals_scored, goals_conceded):
        new_match = update_match_score(
            MatchScore(goals_scored=goal_scored, goals_conceded=goal_conceded),
            new_match.id,
            db_session,
        )
    assert new_match.goals_scored == goals_scored[-1]
    assert new_match.goals_conceded == goals_conceded[-1]


@pytest.mark.parametrize(
    "user,coach,team,match,match_events,total,limit",
    [
        (user_create_unique_1, coach_create, team_create, match_create, [], 0, 10),
        (
            user_create_unique_1,
            coach_create,
            team_create,
            match_create,
            [MatchEvent.START, MatchEvent.END],
            3,
            10,
        ),
        (
            user_create_unique_1,
            coach_create,
            team_create,
            match_create,
            [MatchEvent.START, MatchEvent.END],
            6,
            10,
        ),
        (
            user_create_unique_1,
            coach_create,
            team_create,
            match_create,
            [MatchEvent.START, MatchEvent.END],
            10,
            4,
        ),
        (
            user_create_unique_1,
            coach_create,
            team_create,
            match_create,
            [MatchEvent.START, MatchEvent.END],
            10,
            None,
        ),
    ],
)
def test_correct__get_matches_in_progress_with_limit(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    match: MatchCreate,
    match_events: list[MatchEvent],
    total: int,
    limit: int | None,
    db_session: Session,
) -> None:
    """Tests getting matches in progress with an optional limit.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        match (MatchCreate): Match to be created.
        match_events: list[MatchEvent]: The list of match events to be set.
        total (int): The total number of matches to be created.
        limit (int | None): The optional limit of matches to be gotten from the database.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    for i in range(total):
        new_match = create_new_match(match, db_session)
        if i % 2:
            for match_event in match_events:
                update_match_state(match_event, new_match.id, db_session)
        else:
            update_match_state(match_events[0], new_match.id, db_session)
    matches = get_matches_in_progress_with_limit(limit, db_session)
    assert len(matches) == min(limit if limit else float("inf"), total // 2 + total % 2)
    if matches:
        first_match = matches[0]
        assert first_match.notes == match.notes
        assert first_match.date == match.date
        assert first_match.goals_scored == 0
        assert first_match.goals_conceded == 0


@pytest.mark.parametrize(
    "user,coach,team,matches,page,per_page,team_ids",
    [
        (
            user_create_unique_1,
            coach_create,
            team_create,
            [match_create, match_create],
            0,
            1,
            [1, 1],
        ),
        (
            user_create_unique_1,
            coach_create,
            team_create,
            [match_create, match_create],
            0,
            2,
            [1, 2],
        ),
        (
            user_create_unique_1,
            coach_create,
            team_create,
            [match_create, match_create, match_create],
            1,
            1,
            [1, 2, 1],
        ),
        (
            user_create_unique_1,
            coach_create,
            team_create,
            [match_create, match_create, match_create],
            1,
            2,
            [1, 2, 2],
        ),
        (
            user_create_unique_1,
            coach_create,
            team_create,
            [match_create, match_create, match_create],
            2,
            1,
            [1, 2, 2],
        ),
    ],
)
def test_correct__get_matches_with_pagination_by_team_id(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    matches: list[MatchCreate],
    page: int,
    per_page: int,
    team_ids: list[int],
    db_session: Session,
) -> None:
    """Tests getting all matches that meet the filtering criteria.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        matches (list[MatchCreate]): Matches to be created and read.
        page (int): The page index to be retrieved.
        per_page (int): The number of items per page.
        team_ids (list[int]): The team ids to read.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    for _ in team_ids:
        create_new_team(
            team,
            db_session,
        )
    new_matches = [
        create_new_match(
            match.model_copy(update={"team_id": team_id}),
            db_session,
        )
        for match, team_id in zip(matches, team_ids)
    ]
    for team_id in set(team_ids):
        all_matches, new_total = get_matches_with_pagination_by_team_id(
            page, per_page, team_id, db_session
        )
        assert new_total == sum(t == team_id for t in team_ids)
        for index, new_match in enumerate(
            [m for m in new_matches if m.team_id == team_id]
        ):
            if page * per_page <= index < page * per_page + per_page:
                assert all_matches[index - page * per_page] == new_match


@pytest.mark.parametrize(
    "user,coach,team,match",
    [(user_create_unique_1, coach_create, team_create, match_create)],
)
def test_correct__delete_match(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    match: MatchCreate,
    db_session: Session,
) -> None:
    """Tests getting the match with the given id.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        match (MatchCreate): Match to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    new_match = create_new_match(match, db_session)
    match_by_id = get_match_by_id(new_match.id, db_session)
    assert match_by_id.notes == match.notes
    assert match_by_id.date == match.date
    assert new_match.has_started is False
    assert match_by_id.team.name == team.name
    if match_by_id.team.coach is not None:
        assert match_by_id.team.coach.date_of_birth == coach.date_of_birth

    delete_match(new_match.id, db_session)
    with pytest.raises(MissingException) as excinfo:
        get_match_by_id(new_match.id, db_session)
    assert "Match" == str(excinfo.value)


@pytest.mark.parametrize(
    "match_id",
    [0, 1000000],
)
def test_incorrect__delete_match(
    match_id: int,
    db_session: Session,
) -> None:
    """Tests deleting a missing match.

    Args:
        match_id (int): Match id to be read.
        db_session (Session): Database session.
    """
    with pytest.raises(MissingException) as excinfo:
        delete_match(match_id, db_session)
    assert "Match" == str(excinfo.value)


@pytest.mark.parametrize(
    "users,coach,team,player,match,match_data,player_ids",
    [
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            match_create,
            match_update,
            [2],
        ),
        (
            [user_create_unique_1, user_create_unique_2, user_create_with_role],
            coach_create,
            team_create,
            player_create,
            match_create,
            match_update,
            [3],
        ),
        (
            [user_create_unique_1, user_create_unique_2, user_create_with_role],
            coach_create,
            team_create,
            player_create,
            match_create,
            match_update,
            [2, 3],
        ),
    ],
)
def test_correct__update_match_with_player_ids(
    users: list[UserCreate],
    coach: CoachCreate,
    team: TeamCreate,
    player: PlayerCreate,
    match: MatchCreate,
    match_data: MatchUpdate,
    player_ids: list[int],
    db_session: Session,
) -> None:
    """Tests updating a match.

    Args:
        users (list[UserCreate]): Users to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        player (PlayerCreate): Player to be created.
        match (MatchCreate): Match to be created.
        match_data (MatchUpdate): Match data to be updated.
        player_ids (list[int]): Player ids to be added to the match.
        db_session (Session): Database session.
    """
    user_ids = []
    for user in users:
        user_ids.append(create_new_user(user, db_session).id)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    for user_id in user_ids:
        create_new_player(player.model_copy(update={"user_id": user_id}), db_session)
    new_match = create_new_match(match, db_session)
    updated_match = update_match_with_player_ids(
        match_data, new_match.id, player_ids, db_session
    )
    assert updated_match.team_id == match_data.team_id
    assert updated_match.opponent == match_data.opponent
    assert updated_match.is_home == match_data.is_home
    assert updated_match.notes == match_data.notes
    assert updated_match.date == match_data.date
    assert len(updated_match.players) == len(player_ids)
    for updated_player, player_id in zip(updated_match.players, player_ids):
        assert updated_player.user_id == player_id


@pytest.mark.parametrize(
    "users,coach,team,player,match,match_id,match_data,player_ids,should_create_match",
    [
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            match_create,
            1,
            match_update,
            [2],
            False,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            match_create,
            2,
            match_update,
            [2],
            False,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            match_create,
            1,
            match_update,
            [3],
            True,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            match_create,
            2,
            match_update,
            [3],
            True,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            match_create,
            1,
            match_update,
            [3],
            False,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            match_create,
            2,
            match_update,
            [3],
            False,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            match_create,
            1,
            match_update,
            [],
            True,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            match_create,
            2,
            match_update,
            [],
            True,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            match_create,
            1,
            match_update,
            [],
            False,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            match_create,
            2,
            match_update,
            [],
            False,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            match_create,
            1,
            match_update,
            [3, 3],
            True,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            match_create,
            2,
            match_update,
            [3, 3],
            True,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            match_create,
            1,
            match_update,
            [3, 3],
            False,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            match_create,
            2,
            match_update,
            [3, 3],
            False,
        ),
    ],
)
def test_incorrect_missing__update_match_with_player_ids(
    users: list[UserCreate],
    coach: CoachCreate,
    team: TeamCreate,
    player: PlayerCreate,
    match: MatchCreate,
    match_id: int,
    match_data: MatchUpdate,
    player_ids: list[int],
    should_create_match: bool,
    db_session: Session,
) -> None:
    """Tests trying to update a match with incorrect data.

    Args:
        users (list[UserCreate]): Users to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        player (PlayerCreate): Player to be created.
        match (MatchCreate): Match to be created.
        match_id (int): Match id to be updated.
        match_data (MatchUpdate): Match data to be updated.
        player_ids (list[int]): Player ids to be added to the match.
        should_create_match (bool): Whether the provided match should be created.
        db_session (Session): Database session.
    """
    user_ids = []
    for user in users:
        user_ids.append(create_new_user(user, db_session).id)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    for user_id in user_ids:
        create_new_player(player.model_copy(update={"user_id": user_id}), db_session)
    if should_create_match:
        create_new_match(match, db_session)

    with pytest.raises(MissingException):
        update_match_with_player_ids(match_data, match_id, player_ids, db_session)
