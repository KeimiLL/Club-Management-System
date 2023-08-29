"""Base class for models."""


from typing import Any

from sqlalchemy.orm import as_declarative


@as_declarative()
class Base:
    """Base class for models."""

    id: Any
    metadata: Any
