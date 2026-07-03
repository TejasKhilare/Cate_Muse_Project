from __future__ import annotations

from typing import Annotated

import structlog
from fastapi import Depends, HTTPException, status
from fastapi.security import SecurityScopes

from src.auth.dependencies.authentication import TokenAuthenticatedDependency
from src.auth.dependencies.services import AuthorizationServiceDependency, UserManagementServiceDependency
from src.core.dependencies import LoggerDependency
from src.users.schemas import UserResponse


async def get_request_user(
    token: TokenAuthenticatedDependency,
    user_management_service: UserManagementServiceDependency,
) -> UserResponse:
    return await user_management_service.get_or_create_user(token=token)


UserUnauthorizedDependency = Annotated[UserResponse, Depends(get_request_user)]


async def user_authorization(
    user: UserUnauthorizedDependency,
    security_scopes: SecurityScopes,
    authorization_service: AuthorizationServiceDependency,
    logger: LoggerDependency,
) -> UserResponse:
    if not authorization_service.is_authorized(user=user, required_scopes=security_scopes.scopes):
        logger.warning(
            "Insufficient permissions.",
            user_id=str(user.id),
            user_roles=[str(r) for r in user.roles],
            scopes=list(security_scopes.scopes),
        )
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")

    structlog.contextvars.bind_contextvars(user_id=str(user.id))
    return user


UserAuthorizedDependency = Annotated[UserResponse, Depends(user_authorization)]