from __future__ import annotations

from functools import lru_cache
from typing import Annotated

from fastapi import Depends, Request

from src.auth.config import JWTConfig, UserManagementConfig
from src.auth.permissions import permissions_matrix
from src.auth.services.authorization import AuthorizationService
from src.auth.services.management import UserManagementService
from src.auth.services.openid import OpenIdConfigurationService, OpenIdTokenService
from src.core.dependencies import LoggerDependency
from src.db.dependencies import DBSessionDependency
from src.users.services import UserService


@lru_cache
def get_jwt_config() -> JWTConfig:
    return JWTConfig() # type: ignore


@lru_cache
def get_user_management_config() -> UserManagementConfig:
    return UserManagementConfig()


JWTConfigDependency = Annotated[JWTConfig, Depends(get_jwt_config)]
UserManagementConfigDependency = Annotated[UserManagementConfig, Depends(get_user_management_config)]


def get_openid_configuration_service(request: Request) -> OpenIdConfigurationService:
    # singleton created once in app lifespan — NOT recreated per request
    return request.app.state.openid_config_service


OpenIdConfigurationServiceDependency = Annotated[
    OpenIdConfigurationService, Depends(get_openid_configuration_service)
]


def get_openid_token_service(
    jwt_config: JWTConfigDependency,
    config_service: OpenIdConfigurationServiceDependency,
    logger: LoggerDependency,
) -> OpenIdTokenService:
    # cheap to construct — no I/O here; JWKS is fetched lazily (and cached) inside
    # decode(), with automatic refresh-on-miss for key rotation.
    return OpenIdTokenService(
        issuer=jwt_config.issuer,
        algorithm=jwt_config.algorithm,
        config_service=config_service,
        leeway=jwt_config.leeway,
        logger=logger,
    )


OpenIdTokenServiceDependency = Annotated[OpenIdTokenService, Depends(get_openid_token_service)]


def get_user_service(session: DBSessionDependency, logger: LoggerDependency) -> UserService:
    return UserService(session=session, logger=logger)


UserServiceDependency = Annotated[UserService, Depends(get_user_service)]


def get_user_management_service(
    user_management_config: UserManagementConfigDependency,
    user_service: UserServiceDependency,
    config_service: OpenIdConfigurationServiceDependency,
    logger: LoggerDependency,
) -> UserManagementService:
    return UserManagementService(
        sync_interval_days=user_management_config.sync_interval_days,
        user_service=user_service,
        config_service=config_service,
        logger=logger,
    )


UserManagementServiceDependency = Annotated[UserManagementService, Depends(get_user_management_service)]


def get_authorization_service() -> AuthorizationService:
    return AuthorizationService(permissions=permissions_matrix)


AuthorizationServiceDependency = Annotated[AuthorizationService, Depends(get_authorization_service)]