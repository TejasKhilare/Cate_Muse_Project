from __future__ import annotations

import uuid
from typing import TYPE_CHECKING

from sqlalchemy import select

from src.common.services.base import BaseService
from src.proposals.models import Proposal
from src.proposals.schemas import CreateProposalRequest, ProposalResponse, UpdateProposalStatusRequest

if TYPE_CHECKING:
    from sqlalchemy.ext.asyncio import AsyncSession
    from structlog.typing import FilteringBoundLogger


class ProposalService(BaseService):
    class NotFoundError(BaseService.NotFoundError):
        pass

    def __init__(self, session: AsyncSession, logger: FilteringBoundLogger) -> None:
        super().__init__(logger=logger)
        self._session = session

    async def list(self) -> list[ProposalResponse]:
        result = await self._session.execute(
            select(Proposal).where(Proposal.deleted_at.is_(None)).order_by(Proposal.created_at.desc())
        )
        return [ProposalResponse.model_validate(p) for p in result.scalars().all()]

    async def get(self, proposal_id: uuid.UUID) -> ProposalResponse:
        result = await self._session.execute(
            select(Proposal).where(Proposal.id == proposal_id, Proposal.deleted_at.is_(None))
        )
        proposal = result.scalar_one_or_none()
        if proposal is None:
            raise self.NotFoundError(f"Proposal {proposal_id} not found")
        return ProposalResponse.model_validate(proposal)

    async def create(self, request: CreateProposalRequest, created_by: uuid.UUID) -> ProposalResponse:
        proposal = Proposal(
            created_by=created_by,
            assigned_to=request.assigned_to,
            client_id=request.client_id,
            event_name=request.event_name,
            guest_count=request.guest_count,
            event_date=request.event_date,
            event_type=request.event_type,
            venue=request.venue,
            notes=request.notes,
        )
        self._session.add(proposal)
        await self._session.commit()
        await self._session.refresh(proposal)
        return ProposalResponse.model_validate(proposal)

    async def update_status(self, proposal_id: uuid.UUID, request: UpdateProposalStatusRequest) -> ProposalResponse:
        result = await self._session.execute(
            select(Proposal).where(Proposal.id == proposal_id, Proposal.deleted_at.is_(None))
        )
        proposal = result.scalar_one_or_none()
        if proposal is None:
            raise self.NotFoundError(f"Proposal {proposal_id} not found")

        proposal.status = request.status
        await self._session.commit()
        await self._session.refresh(proposal)
        return ProposalResponse.model_validate(proposal)