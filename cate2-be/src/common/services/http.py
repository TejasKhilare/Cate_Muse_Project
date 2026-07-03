from __future__ import annotations

from typing import TYPE_CHECKING, Any

from src.common.services.base import BaseService

if TYPE_CHECKING:
    from httpx import AsyncClient
    from structlog.typing import FilteringBoundLogger


class BaseHttpService(BaseService):
    def __init__(self, *, client: AsyncClient, logger: FilteringBoundLogger, timeout: int = 5) -> None:
        super().__init__(logger=logger)
        self._client = client
        self._timeout = timeout

    async def _request(self, *, method: str, url: str, headers: dict[str, str] | None = None) -> Any:
        response = await self._client.request(method=method, url=url, headers=headers, timeout=self._timeout)
        response.raise_for_status()
        return response.json()