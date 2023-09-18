"""Rename 'description' to 'name' in 'meetings' table

Revision ID: 9000167b8538
Revises: d63552df296b
Create Date: 2023-09-11 19:44:11.434102

"""

# pylint: skip-file
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "9000167b8538"
down_revision = "d63552df296b"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.alter_column(
        "meetings",
        "description",
        new_column_name="name",
    )


def downgrade() -> None:
    op.alter_column(
        "meetings",
        "name",
        new_column_name="description",
    )
