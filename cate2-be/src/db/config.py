from __future__ import annotations

from pydantic_settings import BaseSettings, SettingsConfigDict


class DBConfig(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="db_", env_file=".env", env_file_encoding="utf-8", extra="ignore", frozen=True
    )

    host: str = "localhost"
    port: int = 5432
    user: str = "postgres"
    password: str = "postgres"
    name: str = "cate2_db"

    @property
    def url(self) -> str:
        return f"postgresql+asyncpg://{self.user}:{self.password}@{self.host}:{self.port}/{self.name}"