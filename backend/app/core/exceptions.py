"""File for custom exceptions."""


class MissingException(Exception):
    """Class for raising a Missing exception from db calls."""

    def __init__(self, item_name: str):
        self.item_name = item_name


class DuplicateException(Exception):
    """Class for raising a Duplicate exception from db calls."""

    def __init__(self, item_name: str):
        self.item_name = item_name


class MissingAssociationObjectException(Exception):
    """Class for raising a MissingRelationshipObject exception from db calls."""

    def __init__(self, item_name: str):
        self.item_name = item_name


class InvalidCredentialsException(Exception):
    """Class for raising an InvalidCredentials exception from API calls."""

    def __init__(self, only_password: bool = False):
        self.only_password = only_password


class JWTTokensException(Exception):
    """Class for raising a JWTTokens exception from API calls."""

    def __init__(self, message: str):
        self.message = message
