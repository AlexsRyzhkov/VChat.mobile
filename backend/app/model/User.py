from sqlalchemy.orm import Mapped, mapped_column
from .Base import Base


class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    surname: Mapped[str]
    login: Mapped[str]
    online: Mapped[bool] = mapped_column(default=False)
    psw_hash: Mapped[str]

    def __repr__(self):
        return f'User(id={self.id!r}, name={self.name!r}, surname={self.surname!r})'
