from __future__ import annotations

from pydantic_settings import BaseSettings, SettingsConfigDict


class JWTConfig(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="jwt_", env_file=".env", env_file_encoding="utf-8", extra="ignore", frozen=True
    )

    request_timeout: int = 5
    algorithm: str = "RS256"
    issuer: str
    leeway: int = 0


class UserManagementConfig(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="user_", env_file=".env", env_file_encoding="utf-8", extra="ignore", frozen=True
    )

    # plain int (days), not timedelta — avoids the "1 = 1 second" parsing trap
    sync_interval_days: int = 1