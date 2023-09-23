"""File for miscellaneous schemas."""


from typing import NewType

from app.schemas.enums import HTTPResponseMessage
from pydantic import BaseModel, NonNegativeInt, conint, conset


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


DBIndexInt = NewType("DBIndexInt", conint(ge=1, lt=10**7))
RatingInt = NewType("RatingInt", conint(ge=1, le=10))

NonEmptyUniqueDBIndexIntSet = NewType(
    "NonEmptyUniqueDBIndexIntSet", conset(DBIndexInt, min_length=1)
)
