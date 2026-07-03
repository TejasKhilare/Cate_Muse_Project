from __future__ import annotations

from typing import Annotated, override

import structlog
from fastapi import Depends, HTTPException, Request
from fastapi.openapi.models import HTTPBearer
from fastapi.security import OAuth2
from fastapi.security.utils import get_authorization_scheme_param
from starlette import status

from src.auth.dependencies.services import OpenIdTokenServiceDependency
from src.auth.dtos import Token
from src.auth.services.openid import OpenIdTokenService
from src.core.dependencies import LoggerDependency


class CustomHTTPBearer(OAuth2):
    def __init__(self) -> None:
        super().__init__()
        self.model = HTTPBearer(
            bearerFormat="JWT", description="Access token obtained from Cognito."
        )
        self.scheme_name = "CognitoAccessTokenBearer"

    @override
    async def __call__(self, request: Request) -> str | None:
        authorization = request.headers.get("Authorization")
        scheme, credentials = get_authorization_scheme_param(authorization)

        if not (authorization and scheme and credentials):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")

        return credentials


security_scheme = CustomHTTPBearer()
TokenRawDependency = Annotated[str, Depends(security_scheme)]


async def token_authentication(
    token_service: OpenIdTokenServiceDependency,
    jwt: TokenRawDependency,
    logger: LoggerDependency,
) -> Token:
    try:
        token = await token_service.decode(jwt)
    except OpenIdTokenService.InvalidTokenError as e:
        logger.warning("Invalid token.", error=str(e))
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token") from e

    structlog.contextvars.bind_contextvars(token_subject=token.claims.sub)
    return token


TokenAuthenticatedDependency = Annotated[Token, Depends(token_authentication)]