from __future__ import annotations

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict

from src.users.enums import Role
from src.users.types import ExternalId


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    external_id: str
    email: str
    name: str
    roles: list[Role]
    created_at: datetime
    updated_at: datetime


class CreateUserRequest(BaseModel):
    external_id: ExternalId
    name: str
    email: str
    roles: list[Role] = []


class SyncUserRequest(BaseModel):
    external_id: ExternalId
    name: str