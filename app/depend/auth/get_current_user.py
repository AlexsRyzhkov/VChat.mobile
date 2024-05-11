# Pip package
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Annotated

# local package
from app.utils import JWToken

security = HTTPBearer()


def get_current_user_id(credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)]):
    token = credentials.credentials

    claim: dict = JWToken.verify_token(token)
    unAuthorizedException = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Неверный токен"
    )

    if not claim or 'user_id' not in claim:
        raise unAuthorizedException

    try:
        int(claim['user_id'])
        return int(claim['user_id'])
    except ValueError:
        raise unAuthorizedException
