from __future__ import annotations

import uuid
from datetime import date, datetime

from pydantic import BaseModel, ConfigDict

from src.proposals.enums import ProposalStatus


class ProposalResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    created_by: uuid.UUID
    assigned_to: uuid.UUID | None
    client_id: int
    event_name: str
    guest_count: int
    event_date: date
    event_type: str
    venue: str | None
    notes: str | None
    status: ProposalStatus
    deleted_at: datetime | None
    archived_at: datetime | None
    created_at: datetime
    updated_at: datetime


class CreateProposalRequest(BaseModel):
    client_id: int
    event_name: str
    guest_count: int
    event_date: date
    event_type: str
    venue: str | None = None
    notes: str | None = None
    assigned_to: uuid.UUID | None = None


class UpdateProposalStatusRequest(BaseModel):
    status: ProposalStatus