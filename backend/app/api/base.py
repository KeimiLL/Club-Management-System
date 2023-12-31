"""Base file for including all routers."""


from app.api.v1.endpoints import (
    coaches,
    matches,
    matchevents,
    meetings,
    players,
    teams,
    users,
)
from fastapi import APIRouter

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(meetings.router, prefix="/meetings", tags=["meetings"])
api_router.include_router(coaches.router, prefix="/coaches", tags=["coaches"])
api_router.include_router(teams.router, prefix="/teams", tags=["teams"])
api_router.include_router(players.router, prefix="/players", tags=["players"])
api_router.include_router(matches.router, prefix="/matches", tags=["matches"])
api_router.include_router(
    matchevents.router, prefix="/matchevents", tags=["matchevents"]
)
