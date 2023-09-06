"""Create 'coaches' table and add its relationship with 'users'

Revision ID: 2c9426b8ad8a
Revises: 8a4c4968b24a
Create Date: 2023-09-01 17:48:47.539565

"""

# pylint: skip-file
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "2c9426b8ad8a"
down_revision = "8a4c4968b24a"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "coaches",
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("date_of_joining", sa.Date(), nullable=False),
        sa.Column("date_of_birth", sa.Date(), nullable=False),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("user_id"),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("coaches")
    # ### end Alembic commands ###