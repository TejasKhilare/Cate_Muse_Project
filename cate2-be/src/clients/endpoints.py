from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Security, status

from src.auth.dependencies.authorization import user_authorization
from src.auth.permissions import Scope
from src.clients.schemas import ClientListItem, ClientResponse, CreateClientRequest, UpdateClientRequest
from src.clients.services import ClientService
from src.core.dependencies import LoggerDependency
from src.db.dependencies import DBSessionDependency
from src.users.schemas import UserResponse

router = APIRouter(prefix="/clients", tags=["clients"])


def get_client_service(session: DBSessionDependency, logger: LoggerDependency) -> ClientService:
    return ClientService(session=session, logger=logger)


ClientServiceDependency = Annotated[ClientService, Depends(get_client_service)]


@router.get("", response_model=list[ClientListItem])
async def list_clients(
    client_service: ClientServiceDependency,
    user: Annotated[UserResponse, Security(user_authorization, scopes=[Scope.CLIENTS_READ])],
) -> list[ClientListItem]:
    return await client_service.list_active()


@router.get("/{client_id}", response_model=ClientResponse)
async def get_client(
    client_id: int,
    client_service: ClientServiceDependency,
    user: Annotated[UserResponse, Security(user_authorization, scopes=[Scope.CLIENTS_READ])],
) -> ClientResponse:
    try:
        return await client_service.get(client_id)
    except ClientService.NotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e)) from e


@router.post("", response_model=ClientResponse, status_code=status.HTTP_201_CREATED)
async def create_client(
    request: CreateClientRequest,
    client_service: ClientServiceDependency,
    user: Annotated[UserResponse, Security(user_authorization, scopes=[Scope.CLIENTS_CREATE])],
) -> ClientResponse:
    try:
        return await client_service.create(request, created_by=user.id)
    except ClientService.ConflictError as e:
        if e.is_unique_violation:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Client name already exists") from e
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database error") from e


@router.patch("/{client_id}", response_model=ClientResponse)
async def update_client(
    client_id: int,
    request: UpdateClientRequest,
    client_service: ClientServiceDependency,
    user: Annotated[UserResponse, Security(user_authorization, scopes=[Scope.CLIENTS_UPDATE])],
) -> ClientResponse:
    try:
        return await client_service.update(client_id, request)
    except ClientService.NotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e)) from e
    except ClientService.ConflictError as e:
        if e.is_unique_violation:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Client name already exists") from e
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database error") from e