"""Create 'trainings' table and add its relationship with 'teams'

Revision ID: 08db87392f1a
Revises: 4397df2634cd
Create Date: 2023-09-05 19:50:37.431486

"""

# pylint: skip-file
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "08db87392f1a"
down_revision = "4397df2634cd"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "trainings",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("team_id", sa.Integer(), nullable=False),
        sa.Column("notes", sa.String(), nullable=False),
        sa.Column("date", sa.Date(), nullable=False),
        sa.ForeignKeyConstraint(
            ["team_id"],
            ["teams.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_trainings_id"), "trainings", ["id"], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_trainings_id"), table_name="trainings")
    op.drop_table("trainings")
    # ### end Alembic commands ###
