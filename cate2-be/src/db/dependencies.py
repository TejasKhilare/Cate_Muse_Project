from __future__ import annotations

from collections.abc import AsyncGenerator
from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from src.db.config import DBConfig

db_config = DBConfig()

engine = create_async_engine(db_config.url, echo=db_config.host == "localhost")
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)


async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session


DBSessionDependency = Annotated[AsyncSession, Depends(get_db_session)]