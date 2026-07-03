from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from structlog.typing import FilteringBoundLogger


class BaseService:
    class ValidationError(Exception):
        pass

    class NotFoundError(Exception):
        pass

    class InputOutputError(Exception):
        pass

    def __init__(self, logger: FilteringBoundLogger) -> None:
        self._log = logger