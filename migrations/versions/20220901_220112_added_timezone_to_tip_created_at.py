"""added timezone to tip created_at

Revision ID: e0df787d0c05
Revises: 17d55c57a94e
Create Date: 2022-09-01 22:01:12.641562

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e0df787d0c05'
down_revision = '17d55c57a94e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tips', 'created_at',
                            existing_type=sa.DateTime,
                            type_=sa.DateTime(timezone=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tips', 'created_at',
                            existing_type=sa.DateTime(timezone=True),
                            type_=sa.DateTime)
    # ### end Alembic commands ###