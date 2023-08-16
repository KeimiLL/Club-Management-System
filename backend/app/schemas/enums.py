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
