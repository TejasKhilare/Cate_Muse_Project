from __future__ import annotations

from itertools import chain
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from collections.abc import Iterable

    from src.auth.permissions import Permissions
    from src.users.schemas import UserResponse


class AuthorizationService:
    def __init__(self, permissions: Permissions) -> None:
        self._permissions = permissions

    def is_authorized(self, user: UserResponse, required_scopes: Iterable[str]) -> bool:
        user_accessible_scopes = set(chain.from_iterable(self._permissions[role] for role in user.roles))
        return user_accessible_scopes.issuperset(required_scopes)