"""File for testing models' __repr__ functions."""


import pytest
from app.models.coach import Coach
from app.models.injury import Injury
from app.models.match import Match
from app.models.match_player import MatchPlayer
from app.models.meeting import Meeting
from app.models.meeting_user import MeetingUser
from app.models.player import Player
from app.models.team import Team
from app.models.training import Training
from app.models.training_player import TrainingPlayer
from app.models.user import User
from app.schemas.enums import Injuries, Roles, TrainingPresence


@pytest.mark.parametrize(
    "coach_data, expected_repr",
    [
        (
            Coach(user_id=1, date_of_joining="2023-01-15", date_of_birth="1990-05-10"),
            "Coach(id=1, doj=2023-01-15, dob=1990-05-10)",
        ),
        (
            Coach(user_id=2, date_of_joining="2022-06-20", date_of_birth="1985-12-03"),
            "Coach(id=2, doj=2022-06-20, dob=1985-12-03)",
        ),
    ],
)
def test_coach_repr(coach_data: Coach, expected_repr: str) -> None:
    """Tests the __repr__ method of the Coach model.

    Args:
        coach_data (Coach): An instance of the Coach model to be tested.
        expected_repr (str): The expected representation string.
    """
    assert repr(coach_data) == expected_repr


@pytest.mark.parametrize(
    "injury_data, expected_repr",
    [
        (
            Injury(
                id=1,
                player_id=1,
                injury_type=Injuries.ANKLE,
                prescriptions="Rest and ice",
            ),
            "Injury(id=1, player_id=1, type=Injuries.ANKLE, pres=Rest and ice)",
        ),
        (
            Injury(id=2, player_id=2, injury_type=Injuries.BICEPS, prescriptions=None),
            "Injury(id=2, player_id=2, type=Injuries.BICEPS, pres=None)",
        ),
    ],
)
def test_injury_repr(injury_data: Injury, expected_repr: str) -> None:
    """Tests the __repr__ method of the Injury model.

    Args:
        injury_data (Injury): An instance of the Injury model to be tested.
        expected_repr (str): The expected representation string.
    """
    assert repr(injury_data) == expected_repr


@pytest.mark.parametrize(
    "match_player_data, expected_repr",
    [
        (
            MatchPlayer(
                id=1,
                match_id=1,
                player_id=1,
                is_starter=True,
                minutes_played=90,
                rating=8,
            ),
            "MatchPlayer(id=1, match_id=1, player_id=1, is_starter=True, mins_pl=90, rating=8)",
        ),
        (
            MatchPlayer(
                id=2,
                match_id=2,
                player_id=2,
                is_starter=False,
                minutes_played=45,
                rating=7,
            ),
            "MatchPlayer(id=2, match_id=2, player_id=2, is_starter=False, mins_pl=45, rating=7)",
        ),
    ],
)
def test_match_player_repr(match_player_data: MatchPlayer, expected_repr: str) -> None:
    """Tests the __repr__ method of the MatchPlayer model.

    Args:
        match_player_data (MatchPlayer): An instance of the MatchPlayer model to be tested.
        expected_repr (str): The expected representation string.
    """
    assert repr(match_player_data) == expected_repr


@pytest.mark.parametrize(
    "match_data, expected_repr",
    [
        (
            Match(
                id=1,
                team_id=1,
                opponent="Opponent Team",
                is_home=True,
                goals_scored=2,
                goals_conceded=1,
                notes="Great match!",
                date="2023-09-15",
            ),
            "Match(id=1, team_id=1, opponent=Opponent Team, is_home=True, "
            "gs=2, gc=1, notes=Great match!, date=2023-09-15)",
        ),
        (
            Match(
                id=2,
                team_id=2,
                opponent="Another Team",
                is_home=False,
                goals_scored=1,
                goals_conceded=3,
                notes="Tough game",
                date="2023-09-20",
            ),
            "Match(id=2, team_id=2, opponent=Another Team, is_home=False, "
            "gs=1, gc=3, notes=Tough game, date=2023-09-20)",
        ),
    ],
)
def test_match_repr(match_data: Match, expected_repr: str) -> None:
    """Tests the __repr__ method of the MatchPlayer model.

    Args:
        match_data (MatchPlayer): An instance of the MatchPlayer model to be tested.
        expected_repr (str): The expected representation string.
    """
    assert repr(match_data) == expected_repr


@pytest.mark.parametrize(
    "meeting_user_data, expected_repr",
    [
        (
            MeetingUser(id=1, meeting_id=1, user_id=1),
            "MeetingUser(id=1, meeting_id=1, user_id=1)",
        ),
        (
            MeetingUser(id=2, meeting_id=2, user_id=2),
            "MeetingUser(id=2, meeting_id=2, user_id=2)",
        ),
    ],
)
def test_meeting_user_repr(meeting_user_data: MeetingUser, expected_repr: str) -> None:
    """Tests the __repr__ method of the MeetingUser model.

    Args:
        meeting_user_data (MeetingUser): An instance of the MeetingUser model to be tested.
        expected_repr (str): The expected representation string.
    """
    assert repr(meeting_user_data) == expected_repr


@pytest.mark.parametrize(
    "meeting_data, expected_repr",
    [
        (
            Meeting(
                id=1,
                user_id=1,
                name="Meeting 1",
                notes="Important discussion",
                date="2023-09-15",
            ),
            "Meeting(id=1, user_id=1, desc=Meeting 1, notes=Important discussion, date=2023-09-15)",
        ),
        (
            Meeting(id=2, user_id=2, name="Meeting 2", notes=None, date="2023-09-20"),
            "Meeting(id=2, user_id=2, desc=Meeting 2, notes=None, date=2023-09-20)",
        ),
    ],
)
def test_meeting_repr(meeting_data: Meeting, expected_repr: str) -> None:
    """Tests the __repr__ method of the Meeting model.

    Args:
        meeting_data (Meeting): An instance of the Meeting model to be tested.
        expected_repr (str): The expected representation string.
    """
    assert repr(meeting_data) == expected_repr


@pytest.mark.parametrize(
    "player_data, expected_repr",
    [
        (
            Player(
                user_id=1,
                team_id=1,
                date_of_joining="2022-01-15",
                date_of_birth="1990-05-10",
                height=180,
                weight=75,
                notes="Talented player",
                is_injured=False,
                diet="Balanced diet",
            ),
            "Player(user_id=1, team_id=1, doj=2022-01-15, dob=1990-05-10, height=180, weight=75, "
            "notes=Talented player, is_injured=False, diet=Balanced diet)",
        ),
        (
            Player(
                user_id=2,
                team_id=2,
                date_of_joining="2021-06-20",
                date_of_birth="1985-12-03",
                height=175,
                weight=80,
                notes="Experienced player",
                is_injured=True,
                diet=None,
            ),
            "Player(user_id=2, team_id=2, doj=2021-06-20, dob=1985-12-03, height=175, weight=80, "
            "notes=Experienced player, is_injured=True, diet=None)",
        ),
    ],
)
def test_player_repr(player_data: Player, expected_repr: str) -> None:
    """Tests the __repr__ method of the Player model.

    Args:
        player_data (Player): An instance of the Player model to be tested.
        expected_repr (str): The expected representation string.
    """
    assert repr(player_data) == expected_repr


@pytest.mark.parametrize(
    "team_data, expected_repr",
    [
        (
            Team(id=1, coach_id=1, name="Team A"),
            "Team(id=1, coach_id=1, name=Team A)",
        ),
        (
            Team(id=2, coach_id=2, name="Team B"),
            "Team(id=2, coach_id=2, name=Team B)",
        ),
    ],
)
def test_team_repr(team_data: Team, expected_repr: str) -> None:
    """Tests the __repr__ method of the Team model.

    Args:
        team_data (Team): An instance of the Team model to be tested.
        expected_repr (str): The expected representation string.
    """
    assert repr(team_data) == expected_repr


@pytest.mark.parametrize(
    "training_player_data, expected_repr",
    [
        (
            TrainingPlayer(
                id=1, training_id=1, player_id=1, presence=TrainingPresence.PRESENT
            ),
            "TrainingPlayer(id=1, training_id=1, player_id=1, presence=TrainingPresence.PRESENT)",
        ),
        (
            TrainingPlayer(
                id=2, training_id=2, player_id=2, presence=TrainingPresence.ABSENT
            ),
            "TrainingPlayer(id=2, training_id=2, player_id=2, presence=TrainingPresence.ABSENT)",
        ),
    ],
)
def test_training_player_repr(
    training_player_data: TrainingPlayer, expected_repr: str
) -> None:
    """Tests the __repr__ method of the TrainingPlayer model.

    Args:
        training_player_data (TrainingPlayer): An instance of the TrainingPlayer model to be tested.
        expected_repr (str): The expected representation string.
    """
    assert repr(training_player_data) == expected_repr


@pytest.mark.parametrize(
    "training_data, expected_repr",
    [
        (
            Training(id=1, team_id=1, notes="Training session", date="2023-09-15"),
            "Training(id=1, team_id=1, notes=Training session, date=2023-09-15)",
        ),
        (
            Training(id=2, team_id=2, notes="Advanced training", date="2023-09-20"),
            "Training(id=2, team_id=2, notes=Advanced training, date=2023-09-20)",
        ),
    ],
)
def test_training_repr(training_data: Training, expected_repr: str) -> None:
    """Tests the __repr__ method of the Training model.

    Args:
        training_data (Training): An instance of the Training model to be tested.
        expected_repr (str): The expected representation string.
    """
    assert repr(training_data) == expected_repr


@pytest.mark.parametrize(
    "user_data, expected_repr",
    [
        (
            User(
                id=1,
                full_name="John Doe",
                email="john@example.com",
                hashed_password="hashed_password",
                role=Roles.COACH,
            ),
            "User(id=1, full_name=John Doe, email=john@example.com, "
            "hashed_password=hashed_password, role=Roles.COACH)",
        ),
        (
            User(
                id=2,
                full_name="Jane Smith",
                email="jane@example.com",
                hashed_password="hashed_password",
                role=Roles.PLAYER,
            ),
            "User(id=2, full_name=Jane Smith, email=jane@example.com, "
            "hashed_password=hashed_password, role=Roles.PLAYER)",
        ),
    ],
)
def test_user_repr(user_data: User, expected_repr: str) -> None:
    """Tests the __repr__ method of the User model.

    Args:
        user_data (User): An instance of the User model to be tested.
        expected_repr (str): The expected representation string.
    """
    assert repr(user_data) == expected_repr
