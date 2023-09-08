"""Create 'injuries' table and add its relationship with 'players'

Revision ID: 8a8f2b553b47
Revises: ca4db8f01700
Create Date: 2023-09-02 20:42:04.178790

"""

# pylint: skip-file
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "8a8f2b553b47"
down_revision = "ca4db8f01700"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "injuries",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("injury_type", sa.String(), nullable=False),
        sa.Column("prescriptions", sa.String(), nullable=False),
        sa.Column("player_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["player_id"],
            ["players.user_id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_injuries_id"), "injuries", ["id"], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_injuries_id"), table_name="injuries")
    op.drop_table("injuries")
    # ### end Alembic commands ###
