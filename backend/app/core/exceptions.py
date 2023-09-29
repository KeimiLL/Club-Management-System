"""File for custom exceptions."""


class MissingException(Exception):
    """Class for raising a Missing exception from DB calls."""

    def __init__(self, item_name: str):
        self.item_name = item_name


class DuplicateException(Exception):
    """Class for raising a Duplicate exception from DB calls."""

    def __init__(self, item_name: str):
        self.item_name = item_name


class MissingAssociationObjectException(Exception):
    """Class for raising a MissingRelationshipObject exception from DB calls."""

    def __init__(self, item_name: str):
        self.item_name = item_name


class GenericException(Exception):
    """Class for raising a Generic exception from API calls."""

    def __init__(self, message: str):
        self.message = message


class InvalidCredentialsException(Exception):
    """Class for raising an InvalidCredentials exception from API calls."""

    def __init__(self, only_password: bool = False):
        self.only_password = only_password


class JWTTokensException(Exception):
    """Class for raising a JWTTokens exception from API calls."""

    def __init__(self, message: str):
        self.message = message


class ForbiddenException(Exception):
    """Class for raising a Forbidden exception from API calls."""

    def __init__(self, item_name: str):
        self.item_name = item_name
