"""File for storing enums for the application."""


from enum import Enum


class Roles(str, Enum):
    """Enum for users roles."""

    ADMIN = "admin"
    BOARD = "board"
    COACH = "coach"
    PLAYER = "player"
    VIEWER = "viewer"
    NONE = "none"


class HTTPResponseMessage(str, Enum):
    """Enum for HTTP responses messages"""

    SUCCESS = "Operation completed successfully"

    UNAUTHENTICATED = "Unauthenticated request"
    UNAUTHORIZED = "Unauthorized request"
    CONFLICT = "State conflict"

    INTERNAL_ERROR = "Internal server error"


class Injuries(str, Enum):
    """Enum for players injuries."""

    ANKLE = "Ankle"
    KNEE = "Knee"
    HAMSTRING = "Hamstring"
    HIP = "Hip"
    SHOULDER = "Shoulder"
    HAND = "Hand"
    WRIST = "Wrist"
    CONCUSSION = "Concussion"
    ADDUCTOR = "Adductor"
    QUADRICEPS = "Quadriceps"
    BICEPS = "Biceps"


class TrainingPresence(str, Enum):
    """Enum for players training presence."""

    PRESENT = "Present"
    ABSENT = "Absent"
    EXCUSED = "Excused"


class MatchEvent(str, Enum):
    """Enum for start and end match events."""

    START = "start"
    END = "end"


class EventType(str, Enum):
    """Enum for types of match event."""

    GOAL = "goal"
    YELLOW_CARD = "yellow_card"
    RED_CARD = "red_card"
