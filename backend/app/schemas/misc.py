"""File for miscellaneous schemas."""


from pydantic import BaseModel

from app.schemas.enums import HTTPResponseMessage


class Message(BaseModel):
    """Class representation of JSONResponse content message."""

    message: str


class MessageFromEnum(BaseModel):
    """Class representation of JSONResponse content message from HTTPResponseMessage enum."""

    message: HTTPResponseMessage
