from __future__ import annotations

from typing import TYPE_CHECKING

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from src.common.services.base import BaseService
from src.users.models import User
from src.users.schemas import CreateUserRequest, SyncUserRequest, UserResponse
from src.users.types import ExternalId

if TYPE_CHECKING:
    import uuid

    from sqlalchemy.ext.asyncio import AsyncSession
    from structlog.typing import FilteringBoundLogger


class UserService(BaseService):
    class NotFoundError(BaseService.NotFoundError):
        pass

    class ConflictError(Exception):
        def __init__(self, message: str, *, is_unique_violation: bool) -> None:
            super().__init__(message)
            self.is_unique_violation = is_unique_violation

    def __init__(self, session: AsyncSession, logger: FilteringBoundLogger) -> None:
        super().__init__(logger=logger)
        self._session = session

    async def get_by_external_id(self, external_id: ExternalId) -> UserResponse:
        result = await self._session.execute(select(User).where(User.external_id == external_id))
        user = result.scalar_one_or_none()
        if user is None:
            raise self.NotFoundError(f"User with external_id={external_id} not found")
        return UserResponse.model_validate(user)

    async def get_by_email(self, email: str) -> UserResponse:
        result = await self._session.execute(select(User).where(User.email == email))
        user = result.scalar_one_or_none()
        if user is None:
            raise self.NotFoundError(f"User with email={email} not found")
        return UserResponse.model_validate(user)

    async def create(self, request: CreateUserRequest) -> UserResponse:
        user = User(
            external_id=request.external_id,
            name=request.name,
            email=request.email,
            roles=request.roles or [],
        )
        self._session.add(user)
        try:
            await self._session.commit()
        except IntegrityError as e:
            await self._session.rollback()
            # postgres unique_violation sqlstate is '23505'
            pgcode = getattr(getattr(e, "orig", None), "sqlstate", None) or getattr(
                getattr(e, "orig", None), "pgcode", None
            )
            raise self.ConflictError(str(e), is_unique_violation=(pgcode == "23505")) from e

        await self._session.refresh(user)
        return UserResponse.model_validate(user)

    async def sync(self, user_id: uuid.UUID, request: SyncUserRequest) -> UserResponse:
        result = await self._session.execute(select(User).where(User.id == user_id))
        user = result.scalar_one()
        user.external_id = request.external_id
        user.name = request.name
        await self._session.commit()
        await self._session.refresh(user)
        return UserResponse.model_validate(user)