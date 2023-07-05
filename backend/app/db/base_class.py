"""Base class for models."""


from typing import Any

from sqlalchemy.orm import as_declarative, declared_attr


@as_declarative()
class Base:
    """Base class for models, used to generate table names automatically."""

    id: Any
    __name__: str
    metadata: Any

    # Generate __tablename__ automatically
    # pylint: disable=no-self-argument
    @declared_attr.directive
    def __tablename__(cls) -> str:
        return cls.__name__.lower()
