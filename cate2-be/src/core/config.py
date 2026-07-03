from __future__ import annotations

from pydantic_settings import BaseSettings, SettingsConfigDict


class AppConfig(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="app_", env_file=".env", env_file_encoding="utf-8", extra="ignore", frozen=True
    )

    env: str = "local"
    debug: bool = True
    title: str = "CATE 2.0 API"
    version: str = "0.1.0"