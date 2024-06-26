"""change revision

Revision ID: 8f317bf21609
Revises: dd498673944f
Create Date: 2024-05-11 18:59:27.488706

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8f317bf21609'
down_revision: Union[str, None] = 'dd498673944f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'online')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('online', sa.BOOLEAN(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###
