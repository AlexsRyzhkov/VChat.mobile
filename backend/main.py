# pip package
from fastapi import FastAPI
from app.router import auth_route, user_route, websocket_route
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_route)
app.include_router(user_route)
app.include_router(websocket_route)