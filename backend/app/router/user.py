# pip package
from typing import Annotated
from fastapi import APIRouter, Depends, status, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi.responses import JSONResponse

# local package
from app.db import get_async_session
from app.model import User
from app.dto import UserDTO
from app.depend.auth import get_current_user_id

route = APIRouter()


@route.get('/users')
async def get_users(async_session: AsyncSession = Depends(get_async_session), user_id=Depends(get_current_user_id)):
    query = select(User)

    result = await async_session.execute(query)

    users = result.scalars().all()
    usersDTO = [UserDTO.model_validate(user, from_attributes=True).dict() for user in users]

    response = {
        "users": usersDTO
    }

    return JSONResponse(content=response, status_code=status.HTTP_200_OK)
