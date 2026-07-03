from typing import Annotated

from fastapi import APIRouter, Security

from src.auth.dependencies.authorization import user_authorization
from src.auth.permissions import Scope
from src.users.schemas import UserResponse

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserResponse)
async def get_me(
    user: Annotated[UserResponse, Security(user_authorization, scopes=[Scope.USERS_ME_READ])],
) -> UserResponse:
    return user