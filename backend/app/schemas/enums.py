"""File for storing enums for the application."""


from enum import Enum


class Roles(str, Enum):
    """Enum for users roles."""

    ADMIN = "admin"
    COACH = "coach"
    PLAYER = "player"
    VIEWER = "viewer"
