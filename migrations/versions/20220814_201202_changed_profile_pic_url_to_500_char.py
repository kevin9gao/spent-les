"""changed profile_pic_url to 500 char

Revision ID: d3abbeda73eb
Revises: 53f2b26173c3
Create Date: 2022-08-14 20:12:02.249673

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd3abbeda73eb'
down_revision = '53f2b26173c3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('extra_column', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'extra_column')
    # ### end Alembic commands ###
