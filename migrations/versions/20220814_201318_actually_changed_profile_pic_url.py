"""actually changed profile_pic_url

Revision ID: 17d55c57a94e
Revises: d3abbeda73eb
Create Date: 2022-08-14 20:13:18.484134

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '17d55c57a94e'
down_revision = 'd3abbeda73eb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'extra_column')
    op.alter_column('users', 'profile_pic_url',
            existing_type=sa.String(length=255), type_=sa.String(length=500))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('extra_column', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.alter_column('users', 'profile_pic_url',
            existing_type=sa.String(length=500), type_=sa.String(length=255))

    # ### end Alembic commands ###