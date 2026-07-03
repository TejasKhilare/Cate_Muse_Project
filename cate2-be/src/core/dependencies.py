from __future__ import annotations

from typing import Annotated

import structlog
from fastapi import Depends, Request
from httpx import AsyncClient
from structlog.typing import FilteringBoundLogger


def get_logger() -> FilteringBoundLogger:
    return structlog.get_logger()


LoggerDependency = Annotated[FilteringBoundLogger, Depends(get_logger)]


def get_http_client(request: Request) -> AsyncClient:
    return request.app.state.http_client


HttpClientDependency = Annotated[AsyncClient, Depends(get_http_client)]