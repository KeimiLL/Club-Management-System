"""Config file for the project."""


from functools import lru_cache
from pathlib import Path

from pydantic import EmailStr, Field, validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Class for project settings."""

    model_config = SettingsConfigDict(case_sensitive=True, env_file=Path(".") / ".env")

    PROJECT_NAME: str = "Club Management System"
    PROJECT_VERSION: str = "0.0.1"

    BACKEND_CORS_ORIGINS: list[str] = Field(default=[])

    # pylint: disable=no-self-argument
    @validator("BACKEND_CORS_ORIGINS", pre=True)
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

    POSTGRES_SERVER: str = Field(default=...)
    POSTGRES_USER: str = Field(default=...)
    POSTGRES_PASSWORD: str = Field(default=...)
    POSTGRES_PORT: str = Field(default=...)
    POSTGRES_DB: str = Field(default=...)

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

    SECRET_KEY: str = Field(default=...)
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=...)
    REFRESH_TOKEN_EXPIRE_DAYS: int = Field(default=...)

    TEST_USER_FULL_NAME: str = Field(default=...)
    TEST_USER_EMAIL: EmailStr = Field(default=...)
    TEST_USER_PASSWORD: str = Field(default=...)

    SUPER_USER_FULL_NAME: str = Field(default=...)
    SUPER_USER_EMAIL: EmailStr = Field(default=...)
    SUPER_USER_PASSWORD: str = Field(default=...)


@lru_cache()
def get_settings() -> Settings:
    """Return a cached version of the settings class instance,
        with properties read from environment variables.

    Returns:
        config.Settings: An instance of the config.Settings class.
    """
    return Settings()
