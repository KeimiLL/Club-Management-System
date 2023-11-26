"""File for testing teams CRUD operations."""


import pytest
from app.core.exceptions import MissingException
from app.crud.crud_coach import create_new_coach
from app.crud.crud_player import create_new_player
from app.crud.crud_team import (
    create_new_team,
    create_team_with_player_ids,
    delete_team,
    get_all_teams,
    get_all_teams_by_coach_id,
    get_all_teams_with_pagination,
    get_team_by_id,
    get_teams_with_pagination_by_coach_id,
    update_team_with_player_ids,
)
from app.crud.crud_user import create_new_user
from app.schemas.coach import CoachCreate
from app.schemas.player import PlayerCreate
from app.schemas.team import TeamCreate, TeamUpdate
from app.schemas.user import UserCreate
from app.tests.conftest import (
    coach_create,
    player_create,
    team_create,
    team_update,
    user_create_unique_1,
    user_create_unique_2,
    user_create_with_role,
)
from sqlalchemy.orm import Session


@pytest.mark.parametrize(
    "user,coach,team",
    [(user_create_unique_1, coach_create, team_create)],
)
def test_correct__create_new_team(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    db_session: Session,
) -> None:
    """Tests creating a team.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    new_team = create_new_team(team, db_session)
    if new_team.coach is not None:
        assert new_team.coach.user.full_name == user.full_name
        assert new_team.coach.date_of_birth == coach.date_of_birth
    assert new_team.name == team.name


@pytest.mark.parametrize(
    "user,coach,team",
    [(user_create_unique_1, coach_create, team_create)],
)
def test_correct__get_team_by_id(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    db_session: Session,
) -> None:
    """Tests getting a team by id.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    new_team = create_new_team(team, db_session)
    team_by_id = get_team_by_id(new_team.id, db_session)
    if team_by_id.coach is not None:
        assert team_by_id.coach.user.full_name == user.full_name
        assert team_by_id.coach.date_of_birth == coach.date_of_birth
    assert team_by_id.name == team.name


@pytest.mark.parametrize(
    "team_id",
    [0, 1000000],
)
def test_incorrect__get_team_by_id(
    team_id: int,
    db_session: Session,
) -> None:
    """Tests getting a missing team by id.

    Args:
        team_id (int): Team id to be read.
        db_session (Session): Database session.
    """
    with pytest.raises(MissingException) as excinfo:
        get_team_by_id(team_id, db_session)
    assert "Team" == str(excinfo.value)


@pytest.mark.parametrize(
    "user,coach,teams",
    [
        (user_create_unique_1, coach_create, []),
        (user_create_unique_1, coach_create, [team_create]),
        (user_create_unique_1, coach_create, [team_create, team_create, team_create]),
    ],
)
def test_correct__get_all_teams(
    user: UserCreate,
    coach: CoachCreate,
    teams: list[TeamCreate],
    db_session: Session,
) -> None:
    """Tests getting all teams.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        teams (list[TeamCreate]): Teams to be created and read.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    for team in teams:
        create_new_team(team, db_session)
    new_teams = get_all_teams(db_session)
    assert len(teams) == len(new_teams)
    assert all((team.name == new_team.name for team, new_team in zip(teams, new_teams)))


@pytest.mark.parametrize(
    "user,coach,team,page,per_page,total",
    [
        (user_create_unique_1, coach_create, team_create, 0, 1, 1),
        (user_create_unique_1, coach_create, team_create, 0, 2, 2),
        (user_create_unique_1, coach_create, team_create, 1, 1, 3),
        (user_create_unique_1, coach_create, team_create, 1, 2, 3),
        (user_create_unique_1, coach_create, team_create, 2, 1, 3),
    ],
)
def test_correct__get_all_teams_with_pagination(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    page: int,
    per_page: int,
    total: int,
    db_session: Session,
) -> None:
    """Tests getting all teams with pagination.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        page (int): The page index to be retrieved.
        per_page (int): The number of items per page.
        total (int): The total number of items.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    new_teams = [create_new_team(team, db_session) for _ in range(total)]
    all_teams, created_total = get_all_teams_with_pagination(page, per_page, db_session)
    assert total == created_total
    for index, new_team in enumerate(new_teams):
        if page * per_page <= index < page * per_page + per_page:
            assert all_teams[index - page * per_page] == new_team


@pytest.mark.parametrize(
    "users,coach,team,page,per_page,user_ids",
    [
        ([user_create_unique_1], coach_create, team_create, 0, 1, [1, 1]),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            0,
            2,
            [1, 2],
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            1,
            1,
            [1, 2, 1],
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            1,
            2,
            [1, 2, 2],
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            2,
            1,
            [1, 2, 2],
        ),
    ],
)
def test_correct__get_teams_with_pagination_by_coach_id(
    users: list[UserCreate],
    coach: CoachCreate,
    team: TeamCreate,
    page: int,
    per_page: int,
    user_ids: list[int],
    db_session: Session,
) -> None:
    """Tests getting all teams that meet the filtering criteria.

    Args:
        users (list[UserCreate]): Users to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        page (int): The page index to be retrieved.
        per_page (int): The number of items per page.
        user_ids (list[int]): The user ids to read.
        db_session (Session): Database session.
    """
    for user in users:
        user_id = create_new_user(user, db_session).id
        create_new_coach(coach.model_copy(update={"user_id": user_id}), db_session)
    new_teams = [
        create_new_team(
            TeamCreate(coach_id=user_id, name=team.name),
            db_session,
        )
        for user_id in user_ids
    ]
    for user_id in set(user_ids):
        all_teams, new_total = get_teams_with_pagination_by_coach_id(
            page, per_page, user_id, db_session
        )
        assert new_total == sum(u == user_id for u in user_ids)
        for index, new_team in enumerate(
            [t for t in new_teams if t.coach_id == user_id]
        ):
            if page * per_page <= index < page * per_page + per_page:
                assert all_teams[index - page * per_page] == new_team


@pytest.mark.parametrize(
    "user,coach,team,player,player_ids",
    [
        (user_create_unique_1, coach_create, team_create, player_create, []),
        (user_create_unique_1, coach_create, team_create, player_create, [1]),
    ],
)
def test_correct__create_team_with_user_ids(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    player: PlayerCreate,
    player_ids: list[int],
    db_session: Session,
) -> None:
    """Tests creating a team with a list of player ids.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        player (PlayerCreate): Player to be created.
        player_ids (list[int]): A list of player_ids to be attached to the team.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    new_player = create_new_player(
        player.model_copy(update={"team_id": None}), db_session
    )
    new_team = create_team_with_player_ids(team, player_ids, db_session)
    if new_team.coach is not None:
        assert new_team.coach.user.full_name == user.full_name
        assert new_team.coach.date_of_birth == coach.date_of_birth
    assert new_team.name == team.name
    if player_ids:
        assert new_team.players[0] == new_player
        assert new_player.team_id == new_team.id


@pytest.mark.parametrize(
    "user,coach,team,player,player_ids",
    [
        (user_create_unique_1, coach_create, team_create, player_create, [2]),
        (user_create_unique_1, coach_create, team_create, player_create, [1, 1]),
        (user_create_unique_1, coach_create, team_create, player_create, [1, 2]),
    ],
)
def test_incorrect_missing__create_team_with_user_ids(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    player: PlayerCreate,
    player_ids: list[int],
    db_session: Session,
) -> None:
    """Tests trying to create a team with incorrect data.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        player (PlayerCreate): Player to be created.
        player_ids (list[int]): A list of player_ids to be attached to the team.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_player(player.model_copy(update={"team_id": None}), db_session)
    with pytest.raises(MissingException):
        create_team_with_player_ids(team, player_ids, db_session)


@pytest.mark.parametrize(
    "user,coach,teams",
    [
        (user_create_unique_1, coach_create, []),
        (user_create_unique_1, coach_create, [team_create]),
        (user_create_unique_1, coach_create, [team_create, team_create, team_create]),
    ],
)
def test_correct__get_all_teams_by_coach_id(
    user: UserCreate,
    coach: CoachCreate,
    teams: list[TeamCreate],
    db_session: Session,
) -> None:
    """Tests getting all teams by coach id.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        teams (list[TeamCreate]): Teams to be created and read.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    for team in teams:
        create_new_team(team, db_session)
    new_teams = get_all_teams_by_coach_id(1, db_session)
    assert len(teams) == len(new_teams)
    assert all((team.name == new_team.name for team, new_team in zip(teams, new_teams)))


@pytest.mark.parametrize(
    "user,coach,team",
    [(user_create_unique_1, coach_create, team_create)],
)
def test_correct__delete_team(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    db_session: Session,
) -> None:
    """Tests deleting the team with the given id.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    new_team = create_new_team(team, db_session)
    team_by_id = get_team_by_id(new_team.id, db_session)
    if team_by_id.coach is not None:
        assert team_by_id.coach.user.full_name == user.full_name
        assert team_by_id.coach.date_of_birth == coach.date_of_birth
    assert team_by_id.name == team.name

    delete_team(new_team.id, db_session)
    with pytest.raises(MissingException) as excinfo:
        get_team_by_id(new_team.id, db_session)
    assert "Team" == str(excinfo.value)


@pytest.mark.parametrize(
    "team_id",
    [0, 1000000],
)
def test_incorrect__delete_team(
    team_id: int,
    db_session: Session,
) -> None:
    """Tests deleting a missing team.

    Args:
        team_id (int): Team id to be read.
        db_session (Session): Database session.
    """
    with pytest.raises(MissingException) as excinfo:
        delete_team(team_id, db_session)
    assert "Team" == str(excinfo.value)


@pytest.mark.parametrize(
    "users,coach,team,player,team_data,player_ids",
    [
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            team_update,
            [2],
        ),
        (
            [user_create_unique_1, user_create_unique_2, user_create_with_role],
            coach_create,
            team_create,
            player_create,
            team_update,
            [3],
        ),
        (
            [user_create_unique_1, user_create_unique_2, user_create_with_role],
            coach_create,
            team_create,
            player_create,
            team_update,
            [2, 3],
        ),
    ],
)
def test_correct__update_team_with_player_ids(
    users: list[UserCreate],
    coach: CoachCreate,
    team: TeamCreate,
    player: PlayerCreate,
    team_data: TeamUpdate,
    player_ids: list[int],
    db_session: Session,
) -> None:
    """Tests updating a team.

    Args:
        users (list[UserCreate]): Users to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        player (PlayerCreate): Player to be created.
        team_data (TeamUpdate): Team data to be updated.
        player_ids (list[int]): Player ids to be added to the match.
        db_session (Session): Database session.
    """
    user_ids = []
    for user in users:
        user_ids.append(create_new_user(user, db_session).id)
    create_new_coach(coach, db_session)
    new_team = create_new_team(team, db_session)
    for user_id in user_ids:
        create_new_player(player.model_copy(update={"user_id": user_id}), db_session)
    updated_team = update_team_with_player_ids(
        team_data, new_team.id, player_ids, db_session
    )
    assert updated_team.coach_id == team_data.coach_id
    assert updated_team.name == team_data.name
    assert len(updated_team.players) == len(player_ids)
    for updated_player, player_id in zip(updated_team.players, player_ids):
        assert updated_player.user_id == player_id


@pytest.mark.parametrize(
    "users,coach,team,player,team_data,team_id,player_ids,should_create_team",
    [
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            team_update,
            1,
            [2],
            False,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            team_update,
            2,
            [2],
            False,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            team_update,
            1,
            [3],
            True,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            team_update,
            2,
            [3],
            True,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            team_update,
            1,
            [3],
            False,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            team_update,
            2,
            [3],
            False,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            team_update,
            1,
            [],
            True,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            team_update,
            2,
            [],
            True,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            team_update,
            1,
            [],
            False,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            team_update,
            2,
            [],
            False,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            team_update,
            1,
            [3, 3],
            True,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            team_update,
            2,
            [3, 3],
            True,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            team_update,
            1,
            [3, 3],
            False,
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            player_create,
            team_update,
            2,
            [3, 3],
            False,
        ),
    ],
)
def test_incorrect_missing__update_team_with_player_ids(
    users: list[UserCreate],
    coach: CoachCreate,
    team: TeamCreate,
    player: PlayerCreate,
    team_data: TeamUpdate,
    team_id: int,
    player_ids: list[int],
    should_create_team: bool,
    db_session: Session,
) -> None:
    """Tests updating a team.

    Args:
        users (list[UserCreate]): Users to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        player (PlayerCreate): Player to be created.
        team_data (TeamUpdate): Team data to be updated.
        team_id (int): Team id to be updated.
        player_ids (list[int]): Player ids to be added to the match.
        should_create_team (bool): Whether the provided team should be created.
        db_session (Session): Database session.
    """
    user_ids = []
    for user in users:
        user_ids.append(create_new_user(user, db_session).id)
    create_new_coach(coach, db_session)
    new_team = create_new_team(team, db_session)
    for user_id in user_ids:
        create_new_player(player.model_copy(update={"user_id": user_id}), db_session)
    if not should_create_team:
        delete_team(new_team.id, db_session)

    with pytest.raises(MissingException):
        update_team_with_player_ids(team_data, team_id, player_ids, db_session)
