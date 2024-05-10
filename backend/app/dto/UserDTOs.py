from pydantic import BaseModel


class UserDTO(BaseModel):
    id: int
    name: str
    surname: str
    login: str
    online: bool