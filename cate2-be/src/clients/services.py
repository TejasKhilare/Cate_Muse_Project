from __future__ import annotations

import uuid
from typing import TYPE_CHECKING

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from src.clients.models import Client
from src.clients.schemas import ClientListItem, ClientListItem, ClientResponse, CreateClientRequest, UpdateClientRequest
from src.common.services.base import BaseService

if TYPE_CHECKING:
    from sqlalchemy.ext.asyncio import AsyncSession
    from structlog.typing import FilteringBoundLogger


class ClientService(BaseService):
    class NotFoundError(BaseService.NotFoundError):
        pass

    class ConflictError(Exception):
        def __init__(self, message: str, *, is_unique_violation: bool) -> None:
            super().__init__(message)
            self.is_unique_violation = is_unique_violation

    def __init__(self, session: AsyncSession, logger: FilteringBoundLogger) -> None:
        super().__init__(logger=logger)
        self._session = session

    async def list_active(self) -> list[ClientListItem]:
        result = await self._session.execute(
                select(Client).where(Client.is_active.is_(True)).order_by(Client.name)
        )
        return [ClientListItem.model_validate(c) for c in result.scalars().all()]

    async def get(self, client_id: int) -> ClientResponse:
        result = await self._session.execute(select(Client).where(Client.id == client_id))
        client = result.scalar_one_or_none()
        if client is None:
            raise self.NotFoundError(f"Client {client_id} not found")
        return ClientResponse.model_validate(client)

    async def create(self, request: CreateClientRequest, created_by: uuid.UUID) -> ClientResponse:
        client = Client(
            name=request.name,
            email=request.email,
            phone_no=request.phone_no,
            company_name=request.company_name,
            notes=request.notes,
            created_by=created_by,
        )
        self._session.add(client)
        try:
            await self._session.commit()
        except IntegrityError as e:
            await self._session.rollback()
            pgcode = getattr(getattr(e, "orig", None), "sqlstate", None)
            raise self.ConflictError(str(e), is_unique_violation=(pgcode == "23505")) from e

        await self._session.refresh(client)
        return ClientResponse.model_validate(client)

    async def update(self, client_id: int, request: UpdateClientRequest) -> ClientResponse:
        result = await self._session.execute(select(Client).where(Client.id == client_id))
        client = result.scalar_one_or_none()
        if client is None:
            raise self.NotFoundError(f"Client {client_id} not found")

        for field, value in request.model_dump(exclude_unset=True).items():
            setattr(client, field, value)

        try:
            await self._session.commit()
        except IntegrityError as e:
            await self._session.rollback()
            pgcode = getattr(getattr(e, "orig", None), "sqlstate", None)
            raise self.ConflictError(str(e), is_unique_violation=(pgcode == "23505")) from e

        await self._session.refresh(client)
        return ClientResponse.model_validate(client)