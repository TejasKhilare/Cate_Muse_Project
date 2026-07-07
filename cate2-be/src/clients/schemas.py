from __future__ import annotations

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ClientResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str | None
    phone_no: str | None
    company_name: str | None
    notes: str | None
    is_active: bool
    created_by: uuid.UUID
    created_at: datetime
    updated_at: datetime


class ClientListItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    is_active: bool


class CreateClientRequest(BaseModel):
    name: str
    email: str | None = None
    phone_no: str | None = None
    company_name: str | None = None
    notes: str | None = None


class UpdateClientRequest(BaseModel):
    name: str | None = None
    email: str | None = None
    phone_no: str | None = None
    company_name: str | None = None
    notes: str | None = None
    is_active: bool | None = None