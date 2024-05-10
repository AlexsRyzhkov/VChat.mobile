from pydantic import BaseModel
from enum import Enum
from app.dto import UserDTO


class ACTIONS(Enum):
    MAKE_CALL = 'make-call'
    ACCEPT_CALL = 'accept-call'
    REJECT_CALL = 'reject-call'
    GET_CALL = 'get-call'


class MakeCall(BaseModel):
    type: ACTIONS = ACTIONS.MAKE_CALL
    user_id_from: int
    user_id_to: int
    offer: str


class GetCall(BaseModel):
    type: ACTIONS = ACTIONS.GET_CALL
    user_id_to: UserDTO
    offer: str


class AcceptCall(BaseModel):
    type: ACTIONS = ACTIONS.ACCEPT_CALL
    offer: str


class RejectCall(BaseModel):
    type: ACTIONS = ACTIONS.REJECT_CALL
