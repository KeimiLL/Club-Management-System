"""File for storing enums for the application."""


from enum import Enum


class Roles(str, Enum):
    """Enum for users roles."""

    ADMIN = "admin"
    COACH = "coach"
    PLAYER = "player"
    VIEWER = "viewer"


class HTTPResponseMessage(str, Enum):
    """Enum for HTTP responses messages."""

    SUCCESS = "Operation completed successfully."

    UNAUTHENTICATED = "Unauthenticated request."
    UNAUTHORIZED = "Unauthorized request."
    CONFLICT = "State conflict."

    INTERNAL_ERROR = "Internal server error."


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
