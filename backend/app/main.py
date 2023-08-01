"""Main file for the application."""

import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError

from app.api.base import api_router
from app.core.config import get_settings
from app.core.exceptions import (
    DuplicateException,
    InvalidCredentialsException,
    JWTTokensException,
    MissingException,
)
from app.schemas.enums import ExceptionMessages


def include_exception_handlers(application: FastAPI) -> None:
    """Includes the app-wide exception handlers.

    Args:
        application (FastAPI): FastAPI application.
    """

    @application.exception_handler(MissingException)
    async def missing_exception_handler(
        _: Request, exc: MissingException
    ) -> JSONResponse:
        """App-wide MissingException handler.

        Args:
            exc (MissingException): The raised MissingException.

        Returns:
            JSONResponse: The response with an appropriate status code and message.
        """
        return JSONResponse(
            status_code=404,
            content={"message": f"{exc.item_name} does not exist."},
        )

    @application.exception_handler(DuplicateException)
    async def duplicate_exception_handler(
        _: Request, exc: DuplicateException
    ) -> JSONResponse:
        """App-wide DuplicateException handler.

        Args:
            exc (DuplicateException): The raised DuplicateException.

        Returns:
            JSONResponse: The response with an appropriate status code and message.
        """
        return JSONResponse(
            status_code=400,
            content={"message": f"{exc.item_name} already exists."},
        )

    @application.exception_handler(SQLAlchemyError)
    async def sqlalchemyerror_handler(*_) -> JSONResponse:
        """App-wide SQLAlchemyError handler.

        Returns:
            JSONResponse: The response with an appropriate status code and message.
        """
        return JSONResponse(
            status_code=409,
            content={"message": ExceptionMessages.CONFLICT},
        )

    @application.exception_handler(InvalidCredentialsException)
    async def invalid_credentials_exception_handler(
        _: Request, exc: InvalidCredentialsException
    ) -> JSONResponse:
        """App-wide InvalidCredentialsException handler.

        Args:
            exc (InvalidCredentialsException): The raised InvalidCredentialsException.

        Returns:
            JSONResponse: The response with an appropriate status code and message.
        """
        return JSONResponse(
            status_code=400,
            content={
                "message": f"Incorrect {'' if exc.only_password else 'email or '}password."
            },
        )

    @application.exception_handler(JWTTokensException)
    async def jwttokens_exception_handler(_: Request, exc: JWTTokensException):
        """App-wide JWTTokensException handler.

        Returns:
            JSONResponse: The response with an appropriate status code and message.
        """
        return JSONResponse(status_code=401, content={"message": exc.message})


def start_application() -> FastAPI:
    """Creates the application instance.

    Returns:
        application (FastAPI): FastAPI application.
    """
    application = FastAPI(
        title=get_settings().PROJECT_NAME,
        version=get_settings().PROJECT_VERSION,
    )
    application.add_middleware(
        CORSMiddleware,
        allow_origins=get_settings().BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    application.include_router(api_router)
    include_exception_handlers(application)

    return application


app = start_application()


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
