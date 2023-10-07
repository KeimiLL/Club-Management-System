"""File for miscellaneous schemas."""


from app.schemas.enums import HTTPResponseMessage
from pydantic import BaseModel, NonNegativeInt


class Message(BaseModel):
    """Class representation of JSONResponse content message."""

    message: str


class MessageFromEnum(BaseModel):
    """Class representation of JSONResponse content message from HTTPResponseMessage enum."""

    message: HTTPResponseMessage


class ItemsListWithTotal(BaseModel):
    """Class for returning a list of items alongside the total number of them."""

    items: list
    total: NonNegativeInt
