from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Security, status

from src.auth.dependencies.authorization import user_authorization
from src.auth.permissions import Scope
from src.core.dependencies import LoggerDependency
from src.db.dependencies import DBSessionDependency
from src.proposals.schemas import CreateProposalRequest, ProposalResponse, UpdateProposalStatusRequest
from src.proposals.services import ProposalService
from src.users.schemas import UserResponse

router = APIRouter(prefix="/proposals", tags=["proposals"])


def get_proposal_service(session: DBSessionDependency, logger: LoggerDependency) -> ProposalService:
    return ProposalService(session=session, logger=logger)


ProposalServiceDependency = Annotated[ProposalService, Depends(get_proposal_service)]


@router.get("", response_model=list[ProposalResponse])
async def list_proposals(
    proposal_service: ProposalServiceDependency,
    user: Annotated[UserResponse, Security(user_authorization, scopes=[Scope.PROPOSALS_READ])],
) -> list[ProposalResponse]:
    return await proposal_service.list()


@router.get("/{proposal_id}", response_model=ProposalResponse)
async def get_proposal(
    proposal_id: str,
    proposal_service: ProposalServiceDependency,
    user: Annotated[UserResponse, Security(user_authorization, scopes=[Scope.PROPOSALS_READ])],
) -> ProposalResponse:
    import uuid as uuid_module
    try:
        return await proposal_service.get(uuid_module.UUID(proposal_id))
    except ProposalService.NotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e)) from e


@router.post("", response_model=ProposalResponse, status_code=status.HTTP_201_CREATED)
async def create_proposal(
    request: CreateProposalRequest,
    proposal_service: ProposalServiceDependency,
    user: Annotated[UserResponse, Security(user_authorization, scopes=[Scope.PROPOSALS_CREATE])],
) -> ProposalResponse:
    return await proposal_service.create(request, created_by=user.id)


@router.patch("/{proposal_id}/status", response_model=ProposalResponse)
async def update_proposal_status(
    proposal_id: str,
    request: UpdateProposalStatusRequest,
    proposal_service: ProposalServiceDependency,
    user: Annotated[UserResponse, Security(user_authorization, scopes=[Scope.PROPOSALS_UPDATE_STATUS])],
) -> ProposalResponse:
    import uuid as uuid_module
    try:
        return await proposal_service.update_status(uuid_module.UUID(proposal_id), request)
    except ProposalService.NotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e)) from e