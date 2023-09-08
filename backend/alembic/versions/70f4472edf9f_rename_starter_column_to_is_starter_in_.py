"""Rename 'starter' column to 'is_starter' in 'matches_players' table

Revision ID: 70f4472edf9f
Revises: 7fba7d1d9c70
Create Date: 2023-09-07 15:09:47.979756

"""

# pylint: skip-file
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "70f4472edf9f"
down_revision = "7fba7d1d9c70"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.alter_column(
        "matches_players",
        "starter",
        new_column_name="is_starter",
        server_default=sa.sql.true(),
    )


def downgrade() -> None:
    op.alter_column(
        "matches_players",
        "is_starter",
        new_column_name="starter",
        server_default=None,
    )
