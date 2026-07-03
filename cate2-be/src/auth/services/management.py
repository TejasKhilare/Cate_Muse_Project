from __future__ import annotations

from datetime import UTC, datetime, timedelta
from typing import TYPE_CHECKING

from src.common.services.base import BaseService
from src.users.schemas import CreateUserRequest, SyncUserRequest, UserResponse
from src.users.services import UserService
from src.users.types import ExternalId

if TYPE_CHECKING:
    from structlog.typing import FilteringBoundLogger

    from src.auth.dtos import Token
    from src.auth.services.openid import OpenIdConfigurationService


class UserManagementService(BaseService):
    def __init__(
        self,
        sync_interval_days: int,
        user_service: UserService,
        config_service: OpenIdConfigurationService,
        logger: FilteringBoundLogger,
    ) -> None:
        super().__init__(logger=logger)
        self._sync_interval = timedelta(days=sync_interval_days)
        self._user_service = user_service
        self._config_service = config_service

    async def get_or_create_user(self, token: Token) -> UserResponse:
        external_id = ExternalId(token.claims.sub)

        try:
            user = await self._user_service.get_by_external_id(external_id)
        except UserService.NotFoundError:
            user_info = await self._config_service.get_userinfo(iss=token.claims.iss, access_token=token.jwt)

            try:
                user = await self._user_service.get_by_email(user_info.email)
            except UserService.NotFoundError:
                user = await self._create_user_safely(
                    external_id=external_id, name=user_info.full_name, email=user_info.email
                )
            else:
                user = await self._user_service.sync(
                    user.id, request=SyncUserRequest(external_id=external_id, name=user_info.full_name)
                )
        else:
            now = datetime.now(UTC)
            if now - user.updated_at > self._sync_interval:
                user_info = await self._config_service.get_userinfo(iss=token.claims.iss, access_token=token.jwt)
                user = await self._user_service.sync(
                    user.id, request=SyncUserRequest(external_id=external_id, name=user_info.full_name)
                )

        return user

    async def _create_user_safely(self, *, external_id: ExternalId, name: str, email: str) -> UserResponse:
        """
        Handles the race where two concurrent first-time logins for the same user
        both miss the existence checks and both attempt to create. Only treats it
        as a race if the error is actually a unique-constraint violation on
        external_id/email — anything else re-raises.
        """
        try:
            return await self._user_service.create(
                CreateUserRequest(external_id=external_id, name=name, email=email)
            )
        except UserService.ConflictError as e:
            if not e.is_unique_violation:
                raise

            self._log.debug("Concurrent user creation detected, re-reading existing row.", external_id=external_id)
            return await self._user_service.get_by_external_id(external_id)