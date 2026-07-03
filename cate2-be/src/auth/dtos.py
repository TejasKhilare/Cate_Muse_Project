from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, SecretStr


class TokenClaims(BaseModel):
    jti: str
    sub: str
    iss: str
    iat: datetime
    exp: datetime


class Token(BaseModel):
    jwt: SecretStr
    claims: TokenClaims


class UserInfoResponse(BaseModel):
    given_name: str
    family_name: str
    email: str

    @property
    def full_name(self) -> str:
        return f"{self.given_name} {self.family_name}"