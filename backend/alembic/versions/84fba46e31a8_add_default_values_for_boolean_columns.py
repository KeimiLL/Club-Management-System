"""Add default values for Boolean() columns

Revision ID: 84fba46e31a8
Revises: 70f4472edf9f
Create Date: 2023-09-07 15:54:35.588206

"""

# pylint: skip-file
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "84fba46e31a8"
down_revision = "70f4472edf9f"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.alter_column(
        "matches",
        "is_home",
        server_default=sa.sql.true(),
    )
    op.alter_column(
        "players",
        "is_injured",
        server_default=sa.sql.false(),
    )


def downgrade() -> None:
    op.alter_column(
        "matches",
        "is_home",
        server_default=None,
    )
    op.alter_column(
        "players",
        "is_injured",
        server_default=None,
    )
