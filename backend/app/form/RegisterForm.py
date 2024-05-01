from pydantic import BaseModel


class RegisterForm(BaseModel):
    name: str
    surname: str
    login: str
    password: str
