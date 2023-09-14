"""File for miscellaneous schemas."""


from typing import NewType

from app.schemas.enums import HTTPResponseMessage
from pydantic import BaseModel, conlist


class Message(BaseModel):
    """Class representation of JSONResponse content message."""

    message: str


class MessageFromEnum(BaseModel):
    """Class representation of JSONResponse content message from HTTPResponseMessage enum."""

    message: HTTPResponseMessage


NonEmptyIntList = NewType("NonEmptyIntList", conlist(int, min_length=1))
