from enum import StrEnum

from src.users.enums import Role


class Scope(StrEnum):
    USERS_ME_READ = "users:me:read"
    CLIENTS_READ = "clients:read"
    CLIENTS_CREATE = "clients:create"
    CLIENTS_UPDATE = "clients:update"
    PROPOSALS_READ = "proposals:read"
    PROPOSALS_CREATE = "proposals:create"
    PROPOSALS_UPDATE_STATUS = "proposals:update_status"


Permissions = dict[Role, set[Scope]]

permissions_matrix: Permissions = {
    Role.ADMIN: {
        Scope.USERS_ME_READ,
        Scope.CLIENTS_READ, Scope.CLIENTS_CREATE, Scope.CLIENTS_UPDATE,
        Scope.PROPOSALS_READ, Scope.PROPOSALS_CREATE, Scope.PROPOSALS_UPDATE_STATUS,
    },
    Role.EVENT_DESIGNER: {
        Scope.USERS_ME_READ,
        Scope.CLIENTS_READ,
        Scope.PROPOSALS_READ, Scope.PROPOSALS_CREATE,
    },
    Role.EVENT_PRODUCER: {
        Scope.USERS_ME_READ,
        Scope.CLIENTS_READ,
        Scope.PROPOSALS_READ, Scope.PROPOSALS_UPDATE_STATUS,
    },
}