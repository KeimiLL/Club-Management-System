"""Main file for the application."""

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.base import api_router
from app.core import config


origins = [
    "http://localhost",
    "http://localhost:4200",
]


def include_router(application: FastAPI) -> None:
    """Includes the router in the application.

    Args:
        application: FastAPI application.
    """
    application.include_router(api_router)


def start_application() -> FastAPI:
    """Creates the application instance.

    Returns:
        application: FastAPI application.
    """
    application = FastAPI(
        title=config.get_settings().PROJECT_NAME,
        version=config.get_settings().PROJECT_VERSION,
    )
    application.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    include_router(application)
    return application


app = start_application()

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
