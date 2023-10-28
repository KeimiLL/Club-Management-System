"""Main file for the application."""

import logging
from typing import Any

import uvicorn
from app.api.base import api_router
from app.api.exception_handlers import (
    duplicate_exception_handler,
    forbidden_exception_handler,
    generic_exception_handler,
    invalid_credentials_exception_handler,
    jwt_tokens_exception_handler,
    missing_association_object_exception_handler,
    missing_exception_handler,
    request_validation_exception_handler,
    sqlalchemyerror_handler,
)
from app.api.middlewares import LogRequestMiddleware
from app.core.config import get_settings
from app.core.exceptions import (
    DuplicateException,
    ForbiddenException,
    GenericException,
    InvalidCredentialsException,
    JWTTokensException,
    MissingAssociationObjectException,
    MissingException,
)
from app.db import base  # pylint: disable=unused-import
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from sqlalchemy.exc import SQLAlchemyError


def custom_openapi(application: FastAPI) -> dict[str, Any]:
    """Overrides the `securitySchemes` set by OpenAPI since they are not accurate.

    Args:
        application (FastAPI): FastAPI application.

    Returns:
        dict[str, Any]: The automatically generated OpenAPI schema with overridden
            `securitySchemes`.
    """
    if application.openapi_schema:
        return application.openapi_schema
    openapi_schema = get_openapi(
        title=get_settings().PROJECT_NAME,
        version=get_settings().PROJECT_VERSION,
        routes=application.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "APIKeyHeader": {"type": "apiKey", "in": "header", "name": "x-xsrf-token"},
    }
    app.openapi_schema = openapi_schema
    return app.openapi_schema


def include_exception_handlers(application: FastAPI) -> None:
    """Includes the app-wide exception handlers.

    Args:
        application (FastAPI): FastAPI application.
    """

    application.add_exception_handler(MissingException, missing_exception_handler)
    application.add_exception_handler(DuplicateException, duplicate_exception_handler)
    application.add_exception_handler(
        MissingAssociationObjectException, missing_association_object_exception_handler
    )
    application.add_exception_handler(GenericException, generic_exception_handler)
    application.add_exception_handler(SQLAlchemyError, sqlalchemyerror_handler)
    application.add_exception_handler(JWTTokensException, jwt_tokens_exception_handler)
    application.add_exception_handler(
        InvalidCredentialsException, invalid_credentials_exception_handler
    )
    application.add_exception_handler(ForbiddenException, forbidden_exception_handler)
    application.add_exception_handler(
        RequestValidationError, request_validation_exception_handler
    )


def include_middleware(application: FastAPI) -> None:
    """Includes the app-wide middleware.

    Args:
        application (FastAPI): FastAPI application.
    """
    uvicorn_access = logging.getLogger("uvicorn.access")
    uvicorn_access.disabled = True
    logger = logging.getLogger("uvicorn")
    logger.setLevel(logging.getLevelName(logging.DEBUG))
    application.add_middleware(LogRequestMiddleware, logger=logger)


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
    include_middleware(application)

    def custom_openapi_wrapper() -> dict[str, Any]:
        return custom_openapi(application)

    application.openapi = custom_openapi_wrapper

    return application


app = start_application()


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
