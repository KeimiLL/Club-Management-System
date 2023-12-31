"""Remove 'unique' constraint from User full_name

Revision ID: 423f2173f94b
Revises: 9168b4e9d52f
Create Date: 2023-07-16 17:18:53.976031

"""

# pylint: skip-file
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "423f2173f94b"
down_revision = "9168b4e9d52f"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint("user_full_name_key", "user", type_="unique")
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint("user_full_name_key", "user", ["full_name"])
    # ### end Alembic commands ###
