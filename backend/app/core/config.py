"""Config file for the project."""


from functools import lru_cache
from pathlib import Path

from pydantic import EmailStr, Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Class for project settings."""

    model_config = SettingsConfigDict(case_sensitive=True, env_file=Path(".") / ".env")

    PROJECT_NAME: str = "Club Management System"
    PROJECT_VERSION: str = "1.0.0"

    BACKEND_CORS_ORIGINS: list[str] = Field([])

    # pylint: disable=no-self-argument
    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    def assemble_cors_origins(cls, value: str | list[str]) -> str | list[str]:
        """Validator for BACKEND_CORS_ORIGINS constant.

        Args:
            value (str | list[str]): Constant value.

        Raises:
            ValueError: If the type of the value loaded from the .env file is the wrong type.

        Returns:
            str | list[str]: A single origin or a list of origins.
        """
        if isinstance(value, str) and not value.startswith("["):
            return [i.strip() for i in value.split(",")]
        if isinstance(value, (list, str)):
            return value
        raise ValueError(value)

    POSTGRES_SERVER: str = Field(...)
    POSTGRES_USER: str = Field(...)
    POSTGRES_PASSWORD: str = Field(...)
    POSTGRES_PORT: str = Field(...)
    POSTGRES_DB: str = Field(...)

    @property
    def db_uri(self) -> str:
        """Creates a Postgres database URI from environment variables.

        Returns:
            str: Postgres database URI.
        """
        return (
            f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            + f"@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )

    SECRET_KEY: str = Field(...)
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(...)
    REFRESH_TOKEN_EXPIRE_DAYS: int = Field(...)

    TEST_USER_FULL_NAME: str = Field(...)
    TEST_USER_EMAIL: EmailStr = Field(...)
    TEST_USER_PASSWORD: str = Field(...)

    SUPER_USER_FULL_NAME: str = Field(...)
    SUPER_USER_EMAIL: EmailStr = Field(...)
    SUPER_USER_PASSWORD: str = Field(...)

    DEV_VIEWER_FULL_NAME: str = Field(...)
    DEV_VIEWER_EMAIL: EmailStr = Field(...)
    DEV_VIEWER_PASSWORD: str = Field(...)

    DEV_NONE_FULL_NAME: str = Field(...)
    DEV_NONE_EMAIL: EmailStr = Field(...)
    DEV_NONE_PASSWORD: str = Field(...)


@lru_cache()
def get_settings() -> Settings:
    """Return a cached version of the settings class instance,
        with properties read from environment variables.

    Returns:
        config.Settings: An instance of the config.Settings class.
    """
    return Settings()
