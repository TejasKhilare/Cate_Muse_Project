from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

import structlog
from fastapi import FastAPI
from httpx import AsyncClient
from src.clients.endpoints import router as clients_router
from src.proposals.endpoints import router as proposals_router
from src.auth.dependencies.services import get_jwt_config
from src.auth.services.openid import OpenIdConfigurationService
from src.core.config import AppConfig
from src.health.endpoints import router as health_router
from src.users.endpoints import router as users_router
from fastapi.middleware.cors import CORSMiddleware
app_config = AppConfig()


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    logger = structlog.get_logger()
    jwt_config = get_jwt_config()  # same lru_cache'd instance the request-time dependency uses

    http_client = AsyncClient()
    openid_config_service = OpenIdConfigurationService(
        client=http_client, logger=logger, timeout=jwt_config.request_timeout
    )

    # warm the JWKS cache once at startup so the first real request doesn't pay the round-trip.
    # NOTE: this makes startup fail-fast if Cognito is unreachable — acceptable tradeoff for
    # local/staging.
    await openid_config_service.get_jwks(iss=jwt_config.issuer)

    app.state.http_client = http_client
    app.state.openid_config_service = openid_config_service

    yield

    await http_client.aclose()

app = FastAPI(title=app_config.title, version=app_config.version, debug=app_config.debug, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(users_router)

app.include_router(clients_router)
app.include_router(proposals_router)