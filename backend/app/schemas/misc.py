"""File for miscellaneous schemas."""


from typing import Generic, TypeVar

from app.schemas.enums import HTTPResponseMessage
from pydantic import BaseModel, NonNegativeInt


class Message(BaseModel):
    """Class representation of JSONResponse content message."""

    message: str


class MessageFromEnum(BaseModel):
    """Class representation of JSONResponse content message from HTTPResponseMessage enum."""

    message: HTTPResponseMessage


T = TypeVar("T")


class ItemsListWithTotal(BaseModel, Generic[T]):
    """Class for returning a list of items alongside the total number of them."""

    items: list[T]
    total: NonNegativeInt
