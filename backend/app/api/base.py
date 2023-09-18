"""Base file for including all routers."""


from app.api.v1.endpoints import meetings, users
from fastapi import APIRouter

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(meetings.router, prefix="/meetings", tags=["meetings"])
