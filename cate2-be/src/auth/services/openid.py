from __future__ import annotations

import time
from typing import TYPE_CHECKING, Any

from jwt import PyJWK, PyJWKSet, PyJWKSetError, PyJWTError, decode, get_unverified_header
from pydantic import SecretStr, ValidationError

from src.auth.dtos import Token, TokenClaims, UserInfoResponse
from src.common.services.base import BaseService
from src.common.services.http import BaseHttpService

if TYPE_CHECKING:
    from httpx import AsyncClient
    from jwt.algorithms import AllowedPublicKeys
    from structlog.typing import FilteringBoundLogger

    OpenIdWellKnownConfiguration = dict[str, Any]


class OpenIdTokenService(BaseService):
    """
    Created fresh per-request (cheap — holds only references), but the JWKS
    it reads through `config_service` is the long-lived, process-wide cache.
    On a `kid` miss (possible Cognito key rotation), forces one refetch
    before failing the token as invalid. The refetch itself is cooldown-throttled
    by OpenIdConfigurationService, so a flood of bad `kid`s can't be used to
    bypass the cache on every request.
    """

    class InvalidTokenError(BaseService.ValidationError):
        pass

    def __init__(
        self,
        issuer: str,
        algorithm: str,
        config_service: OpenIdConfigurationService,
        leeway: int,
        logger: FilteringBoundLogger,
    ) -> None:
        super().__init__(logger=logger)
        self._issuer = issuer
        self._algorithm = algorithm
        self._config_service = config_service
        self._leeway = leeway

    async def decode(self, jwt: str) -> Token:
        key = await self._get_key(jwt)

        try:
            claims = decode(jwt, key=key, algorithms=[self._algorithm], issuer=self._issuer, leeway=self._leeway)
        except PyJWTError as e:
            raise self.InvalidTokenError(str(e)) from e

        try:
            # claims is a raw dict from PyJWT — must be validated into TokenClaims,
            # not passed through as-is, or jti/sub/iss/iat/exp presence + typing is
            # never actually checked. jwt itself must be wrapped in SecretStr to
            # match Token.jwt's declared type.
            return Token(jwt=SecretStr(jwt), claims=TokenClaims(**claims))
        except ValidationError as e:
            raise self.InvalidTokenError(str(e)) from e

    async def _get_key(self, jwt: str) -> AllowedPublicKeys:
        try:
            headers = get_unverified_header(jwt)
        except PyJWTError as e:
            raise self.InvalidTokenError(str(e)) from e

        kid = headers.get("kid")
        if kid is None:
            raise self.InvalidTokenError("Token header is missing 'kid'.")

        jwks = await self._config_service.get_jwks(iss=self._issuer)

        try:
            pyjwk: PyJWK = jwks[kid]
        except KeyError:
            self._log.warning("Unknown JWKS kid, requesting refresh (possible key rotation).", kid=kid)
            jwks = await self._config_service.get_jwks(iss=self._issuer, force_refresh=True)

            try:
                pyjwk = jwks[kid]
            except KeyError as e:
                raise self.InvalidTokenError(str(e)) from e

        return pyjwk.key


class OpenIdConfigurationService(BaseHttpService):
    """
    Long-lived singleton — created once in app lifespan, stored on app.state.
    Caches per-issuer well-known config + JWKS for the process lifetime.

    `force_refresh` is cooldown-throttled per issuer: a flood of tokens carrying
    unrecognized `kid`s (garbage, expired, or forged) can trigger at most one
    real outbound refresh per `refresh_cooldown_seconds` window.
    """

    def __init__(
        self,
        *,
        client: AsyncClient,
        logger: FilteringBoundLogger,
        timeout: int = 5,
        refresh_cooldown_seconds: float = 30,
    ) -> None:
        super().__init__(client=client, logger=logger, timeout=timeout)
        self._cached_configurations: dict[str, OpenIdWellKnownConfiguration] = {}
        self._cached_jwks: dict[str, PyJWKSet] = {}
        self._last_jwks_refresh: dict[str, float] = {}
        self._refresh_cooldown = refresh_cooldown_seconds

    async def get_configuration(self, iss: str) -> OpenIdWellKnownConfiguration:
        try:
            return self._cached_configurations[iss]
        except KeyError:
            self._log.debug("OpenID configuration not cached, fetching.", iss=iss)
            result = self._cached_configurations[iss] = await self._request(
                method="get", url=f"{iss.rstrip('/')}/.well-known/openid-configuration"
            )
            return result

    async def get_jwks(self, iss: str, force_refresh: bool = False) -> PyJWKSet:
        now = time.monotonic()

        if force_refresh:
            last_refresh = self._last_jwks_refresh.get(iss, 0.0)
            if now - last_refresh < self._refresh_cooldown:
                self._log.debug(
                    "JWKS force_refresh requested but within cooldown window, using cached value.",
                    iss=iss,
                    seconds_since_last_refresh=now - last_refresh,
                )
                force_refresh = False

        if not force_refresh:
            try:
                return self._cached_jwks[iss]
            except KeyError:
                pass

        self._log.debug("Fetching JWKS.", iss=iss, force_refresh=force_refresh)
        config = await self.get_configuration(iss=iss)
        url: str = config["jwks_uri"]
        jwks_response = await self._request(method="get", url=url)

        try:
            result = self._cached_jwks[iss] = PyJWKSet.from_dict(jwks_response)
        except PyJWKSetError as e:
            raise self.InputOutputError(str(e)) from e

        self._last_jwks_refresh[iss] = now
        return result

    async def get_userinfo(self, iss: str, access_token: SecretStr) -> UserInfoResponse:
        config = await self.get_configuration(iss=iss)
        url: str = config["userinfo_endpoint"]
        userinfo_response = await self._request(
            method="get", url=url, headers={"Authorization": f"Bearer {access_token.get_secret_value()}"}
        )

        try:
            return UserInfoResponse(**userinfo_response)
        except ValidationError as e:
            raise self.InputOutputError(str(e)) from e