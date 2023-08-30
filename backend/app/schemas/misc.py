"""File for miscellaneous schemas."""


from app.schemas.enums import HTTPResponseMessage
from pydantic import BaseModel


class Message(BaseModel):
    """Class representation of JSONResponse content message."""

    message: str


class MessageFromEnum(BaseModel):
    """Class representation of JSONResponse content message from HTTPResponseMessage enum."""

    message: HTTPResponseMessage
