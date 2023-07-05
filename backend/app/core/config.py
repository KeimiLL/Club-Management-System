"""Config file for the project."""


from functools import lru_cache
from pathlib import Path

from pydantic import EmailStr, Field, computed_field
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

    @computed_field
    def db_uri(self) -> str:
        """Creates a Postgres database URI from environment variables.

        Returns:
            str: Postgres databse URI.
        """
        return (
            f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            + f"@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )

    SECRET_KEY: str = Field(default=...)
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    TEST_USER_USERNAME: str = "testuser"
    TEST_USER_EMAIL: EmailStr = "test@example.com"


@lru_cache()
def get_settings() -> Settings:
    """Return a cached version of the settings class instance,
        with properties read from environment variables.

    Returns:
        config.Settings: An instance of the config.Settings class.
    """
    return Settings()
