from enum import StrEnum

from src.users.enums import Role


class Scope(StrEnum):
    USERS_ME_READ = "users:me:read"


Permissions = dict[Role, set[Scope]]

permissions_matrix: Permissions = {
    Role.ADMIN: {Scope.USERS_ME_READ},
    Role.EVENT_DESIGNER: {Scope.USERS_ME_READ},
    Role.EVENT_PRODUCER: {Scope.USERS_ME_READ},
}