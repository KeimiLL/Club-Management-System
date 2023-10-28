"""File responsible for initializing and providing dependency instances for the FastAPI
application."""

from app.api.dependencies import CanUserAccessEndpoint
from app.schemas.enums import Roles

all_allowed = CanUserAccessEndpoint()
viewer_not_allowed = CanUserAccessEndpoint({Roles.VIEWER})
player_not_allowed = CanUserAccessEndpoint({Roles.VIEWER, Roles.PLAYER})
coach_not_allowed = CanUserAccessEndpoint({Roles.VIEWER, Roles.PLAYER, Roles.COACH})
board_not_allowed = CanUserAccessEndpoint(
    {Roles.VIEWER, Roles.PLAYER, Roles.COACH, Roles.BOARD}
)
