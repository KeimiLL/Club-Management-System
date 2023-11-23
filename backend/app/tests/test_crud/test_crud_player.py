"""File for testing players CRUD operations."""


import pytest
from app.core.exceptions import MissingException
from app.crud.crud_coach import create_new_coach
from app.crud.crud_player import (
    create_new_player,
    delete_player,
    get_all_players,
    get_player_by_user_id,
    get_players_with_pagination_by_team_id,
    update_player,
)
from app.crud.crud_team import create_new_team
from app.crud.crud_user import create_new_user
from app.schemas.coach import CoachCreate
from app.schemas.player import PlayerCreate, PlayerUpdate
from app.schemas.team import TeamCreate
from app.schemas.user import UserCreate, UserCreateWithRole
from app.tests.conftest import (
    coach_create,
    player_create,
    player_update,
    team_create,
    user_create_unique_1,
    user_create_unique_2,
    user_create_with_role,
)
from sqlalchemy.orm import Session


@pytest.mark.parametrize(
    "user,coach,team,player",
    [(user_create_unique_1, coach_create, team_create, player_create)],
)
def test_correct__create_new_player(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    player: PlayerCreate,
    db_session: Session,
) -> None:
    """Tests creating a player.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        player (PlayerCreate): Player to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    new_player = create_new_player(player, db_session)
    assert new_player.user.full_name == user.full_name
    if new_player.team is not None:
        assert new_player.team.name == team.name
        if new_player.team.coach is not None:
            assert new_player.team.coach.date_of_birth == coach.date_of_birth
    assert new_player.date_of_birth == player.date_of_birth


@pytest.mark.parametrize(
    "user,coach,team,player",
    [(user_create_unique_1, coach_create, team_create, player_create)],
)
def test_correct__get_player_by_user_id(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    player: PlayerCreate,
    db_session: Session,
) -> None:
    """Tests getting a player by user id.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        player (PlayerCreate): Player to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    new_player = create_new_player(player, db_session)
    player_by_user_id = get_player_by_user_id(new_player.user_id, db_session)
    assert player_by_user_id.user.full_name == user.full_name
    if player_by_user_id.team is not None:
        assert player_by_user_id.team.name == team.name
        if player_by_user_id.team.coach is not None:
            assert player_by_user_id.team.coach.date_of_birth == coach.date_of_birth
    assert player_by_user_id.date_of_birth == player.date_of_birth


@pytest.mark.parametrize(
    "user_id",
    [0, 1000000],
)
def test_incorrect__get_player_by_user_id(
    user_id: int,
    db_session: Session,
) -> None:
    """Tests getting a missing player by user id.

    Args:
        user_id (int): User id to be read.
        db_session (Session): Database session.
    """
    with pytest.raises(MissingException) as excinfo:
        get_player_by_user_id(user_id, db_session)
    assert "Player" == str(excinfo.value)


@pytest.mark.parametrize(
    "users,coach,team,players",
    [
        ([user_create_unique_1], coach_create, team_create, []),
        ([user_create_unique_1], coach_create, team_create, [player_create]),
        (
            [user_create_unique_1, user_create_unique_2, user_create_with_role],
            coach_create,
            team_create,
            [player_create, player_create, player_create],
        ),
    ],
)
def test_correct__get_all_players(
    users: list[UserCreate | UserCreateWithRole],
    coach: CoachCreate,
    team: TeamCreate,
    players: list[PlayerCreate],
    db_session: Session,
) -> None:
    """Tests getting all players.

    Args:
        users (list[UserCreate | UserCreateWithRole]): Users to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        players (list[PlayerCreate]): Players to be created and read.
        db_session (Session): Database session.
    """
    for user in users:
        create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    for index, player in enumerate(players):
        create_new_player(player.model_copy(update={"user_id": index + 1}), db_session)
    new_players = get_all_players(db_session)
    assert len(players) == len(new_players)
    assert all(
        (
            player.date_of_birth == new_player.date_of_birth
            and player.height == new_player.height
            for player, new_player in zip(players, new_players)
        )
    )


@pytest.mark.parametrize(
    "users,coach,team,players,page,per_page,team_ids",
    [
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            [player_create, player_create],
            0,
            1,
            [1, 1],
        ),
        (
            [user_create_unique_1, user_create_unique_2],
            coach_create,
            team_create,
            [player_create, player_create],
            0,
            2,
            [1, 2],
        ),
        (
            [user_create_unique_1, user_create_unique_2, user_create_with_role],
            coach_create,
            team_create,
            [player_create, player_create, player_create],
            1,
            1,
            [1, 2, 1],
        ),
        (
            [user_create_unique_1, user_create_unique_2, user_create_with_role],
            coach_create,
            team_create,
            [player_create, player_create, player_create],
            1,
            2,
            [1, 2, 2],
        ),
        (
            [user_create_unique_1, user_create_unique_2, user_create_with_role],
            coach_create,
            team_create,
            [player_create, player_create, player_create],
            2,
            1,
            [1, 2, 2],
        ),
    ],
)
def test_correct__get_players_with_pagination_by_team_id(
    users: list[UserCreate | UserCreateWithRole],
    coach: CoachCreate,
    team: TeamCreate,
    players: list[PlayerCreate],
    page: int,
    per_page: int,
    team_ids: list[int],
    db_session: Session,
) -> None:
    """Tests getting all players that meet the filtering criteria.

    Args:
        users (list[UserCreate | UserCreateWithRole]): Users to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        players (list[PlayerCreate]): Players to be created and read.
        page (int): The page index to be retrieved.
        per_page (int): The number of items per page.
        team_ids (list[int]): The team ids to read.
        db_session (Session): Database session.
    """
    for user in users:
        create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    for _ in team_ids:
        create_new_team(
            team,
            db_session,
        )
    new_players = [
        create_new_player(
            player.model_copy(update={"user_id": index + 1, "team_id": team_id}),
            db_session,
        )
        for index, (player, team_id) in enumerate(zip(players, team_ids))
    ]
    for team_id in set(team_ids):
        all_players, new_total = get_players_with_pagination_by_team_id(
            page, per_page, team_id, db_session
        )
        assert new_total == sum(t == team_id for t in team_ids)
        for index, new_player in enumerate(
            [p for p in new_players if p.team_id == team_id]
        ):
            if page * per_page <= index < page * per_page + per_page:
                assert all_players[index - page * per_page] == new_player


@pytest.mark.parametrize(
    "user,coach,team,player",
    [(user_create_unique_1, coach_create, team_create, player_create)],
)
def test_correct__delete_player(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    player: PlayerCreate,
    db_session: Session,
) -> None:
    """Tests deleting the player with the given user id.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        player (PlayerCreate): Player to be created.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    new_player = create_new_player(player, db_session)
    player_by_user_id = get_player_by_user_id(new_player.user_id, db_session)
    assert player_by_user_id.user.full_name == user.full_name
    if player_by_user_id.team is not None:
        assert player_by_user_id.team.name == team.name
        if player_by_user_id.team.coach is not None:
            assert player_by_user_id.team.coach.date_of_birth == coach.date_of_birth
    assert player_by_user_id.date_of_birth == player.date_of_birth

    delete_player(new_player.user_id, db_session)
    with pytest.raises(MissingException) as excinfo:
        get_player_by_user_id(new_player.user_id, db_session)
    assert "Player" == str(excinfo.value)


@pytest.mark.parametrize(
    "user_id",
    [0, 1000000],
)
def test_incorrect__delete_player(
    user_id: int,
    db_session: Session,
) -> None:
    """Tests deleting a missing player.

    Args:
        user_id (int): User id to be read.
        db_session (Session): Database session.
    """
    with pytest.raises(MissingException) as excinfo:
        delete_player(user_id, db_session)
    assert "Player" == str(excinfo.value)


@pytest.mark.parametrize(
    "user,coach,team,player,player_data",
    [(user_create_unique_1, coach_create, team_create, player_create, player_update)],
)
def test_correct__update_player(
    user: UserCreate,
    coach: CoachCreate,
    team: TeamCreate,
    player: PlayerCreate,
    player_data: PlayerUpdate,
    db_session: Session,
) -> None:
    """Tests updating a player.

    Args:
        user (UserCreate): User to be created.
        coach (CoachCreate): Coach to be created.
        team (TeamCreate): Team to be created.
        player (PlayerCreate): Player to be created.
        player_data (PlayerUpdate): Player data to be updated.
        db_session (Session): Database session.
    """
    create_new_user(user, db_session)
    create_new_coach(coach, db_session)
    create_new_team(team, db_session)
    new_player = create_new_player(player, db_session)
    updated_player = update_player(player_data, new_player.user_id, db_session)
    assert updated_player.user.full_name == user.full_name
    if updated_player.team is not None:
        assert updated_player.team.name == team.name
        if updated_player.team.coach is not None:
            assert updated_player.team.coach.date_of_birth == coach.date_of_birth
    assert updated_player.date_of_birth == player_data.date_of_birth
