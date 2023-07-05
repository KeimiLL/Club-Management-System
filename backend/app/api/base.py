"""Base file for including all routers."""


from fastapi import APIRouter

api_router = APIRouter(prefix="/api/v1")
