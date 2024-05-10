# pip package
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

# local package
from app.dto import UserDTO
from app.form import LoginForm, RegisterForm
from app.db import get_async_session
from app.model import User
from app.utils import PSW, JWToken

route = APIRouter(
    tags=['auth']
)


def create_response(user: User):
    userDTO = UserDTO.model_validate(user, from_attributes=True).dict()

    access_token = JWToken.create_access_token(user.id)
    refresh_token = JWToken.create_refresh_token(user.id)

    response = {
        'access_token': access_token,
        'refresh_token': refresh_token,
        'user': userDTO
    }

    return response


@route.post("/login")
async def login(loginForm: LoginForm, async_session: AsyncSession = Depends(get_async_session)):
    query = select(User).where(and_(
        User.login == loginForm.login
    ))
    result = await async_session.scalars(query)
    user = result.one_or_none()

    if not user:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={'message': 'Неверный логин или пароль12'})

    return JSONResponse(content=create_response(user), status_code=status.HTTP_200_OK)


@route.post("/register")
async def register(registerForm: RegisterForm, async_session: AsyncSession = Depends(get_async_session)):
    query = select(User).filter(and_(
        User.login == registerForm.login
    ))
    user = await async_session.scalars(query)

    userIsExist = user.one_or_none()
    if userIsExist:
        return  JSONResponse(status_code=400, content={'message': 'Неверный логин или пароль'})

    hashedPassword = PSW.hash_password(registerForm.password)

    user = User(
        name=registerForm.name,
        surname=registerForm.surname,
        login=registerForm.login,
        psw_hash=hashedPassword
    )

    async_session.add(user)
    await async_session.commit()

    return JSONResponse(content=create_response(user), status_code=status.HTTP_201_CREATED)

@route.post('refresh')
async def refresh():
    pass