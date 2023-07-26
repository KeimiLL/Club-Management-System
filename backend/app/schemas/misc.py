"""File for miscellaneous schemas."""


from pydantic import BaseModel

from app.schemas.enums import ExceptionMessages


class Message(BaseModel):
    """Class representation of JSONResponse content message."""

    message: str


class MessageFromEnum(BaseModel):
    """Class representation of JSONResponse content message from ExceptionMessages enum."""

    message: ExceptionMessages
