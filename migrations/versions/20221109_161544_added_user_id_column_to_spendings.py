"""added user_id column to spendings

Revision ID: ac7d7e4dfb5c
Revises: 65c0aae13aad
Create Date: 2022-11-09 16:15:44.521676

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ac7d7e4dfb5c'
down_revision = '65c0aae13aad'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('spendings', sa.Column('user_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'spendings', 'users', ['user_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'spendings', type_='foreignkey')
    op.drop_column('spendings', 'user_id')
    # ### end Alembic commands ###
