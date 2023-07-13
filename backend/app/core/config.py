"""Config file for the project."""


from functools import lru_cache
from pathlib import Path

from pydantic import EmailStr, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Class for project settings."""

    model_config = SettingsConfigDict(case_sensitive=True, env_file=Path(".") / ".env")

    PROJECT_NAME: str = "Club Management System"
    PROJECT_VERSION: str = "0.0.1"

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
