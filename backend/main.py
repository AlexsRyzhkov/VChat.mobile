from fastapi import FastAPI
from app.router import auth_route, user_route

app = FastAPI()

app.include_router(auth_route)
app.include_router(user_route)
