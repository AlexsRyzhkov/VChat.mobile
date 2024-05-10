from fastapi import (
    APIRouter,
    WebSocket,
    WebSocketDisconnect,
    status,
    WebSocketException,
    Depends,
    Query
)
from app.db import get_async_session
from app.utils import JWToken
from typing import Annotated, Union

route = APIRouter()


class ConnectionManager:
    def __init__(self):
        self.active_connections: dict = dict()
        self.async_session = get_async_session()

    async def connect(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        self.active_connections[user_id] = websocket
        print(len(self.active_connections))

    def disconnect(self, user_id: int):
        self.active_connections.pop(user_id)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()


async def get_user_id(
        websocket: WebSocket,
        token: Annotated[str | None, Query()] = None
):
    if token is None:
        raise WebSocketException(code=status.WS_1008_POLICY_VIOLATION)

    claim: dict = JWToken.verify_token(token)

    if not claim or 'user_id' not in claim:
        raise WebSocketException(code=status.WS_1008_POLICY_VIOLATION)

    try:
        int(claim['user_id'])
        return int(claim['user_id'])
    except ValueError:
        raise WebSocketException(code=status.WS_1008_POLICY_VIOLATION)


@route.websocket('/ws')
async def websocket(
        websocket: WebSocket,
        user_id: Annotated[int, Depends(get_user_id)]
):

    await manager.connect(websocket, user_id)
    try:
        while True:
            data = await websocket.receive_json()
            await websocket.send_json(data)
            print(data['code'])
    except WebSocketDisconnect:
        manager.disconnect(user_id)
        await manager.broadcast(f"left the chat")
