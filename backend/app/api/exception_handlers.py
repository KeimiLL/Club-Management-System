"""File containing exception handlers."""


import logging

from app.core.exceptions import (
    DuplicateException,
    InvalidCredentialsException,
    JWTTokensException,
    MissingException,
)
from app.schemas.enums import HTTPResponseMessage
from fastapi import Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError


async def missing_exception_handler(_: Request, exc: MissingException) -> JSONResponse:
    """App-wide MissingException handler.

    Args:
        exc (MissingException): The raised MissingException.

    Returns:
        JSONResponse: The response with an appropriate status code and message.
    """
    logging.getLogger("uvicorn").info(msg=exc, exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": f"{exc.item_name} does not exist."},
    )


async def duplicate_exception_handler(
    _: Request, exc: DuplicateException
) -> JSONResponse:
    """App-wide DuplicateException handler.

    Args:
        exc (DuplicateException): The raised DuplicateException.

    Returns:
        JSONResponse: The response with an appropriate status code and message.
    """
    logging.getLogger("uvicorn").info(msg=exc, exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"message": f"{exc.item_name} already exists."},
    )


async def sqlalchemyerror_handler(_: Request, exc: SQLAlchemyError) -> JSONResponse:
    """App-wide SQLAlchemyError handler.

    Args:
        exc (SQLAlchemyError): The raised SQLAlchemyError.

    Returns:
        JSONResponse: The response with an appropriate status code and message.
    """
    logging.getLogger("uvicorn").info(msg=exc, exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_409_CONFLICT,
        content={"message": HTTPResponseMessage.CONFLICT},
    )


async def invalid_credentials_exception_handler(
    _: Request, exc: InvalidCredentialsException
) -> JSONResponse:
    """App-wide InvalidCredentialsException handler.

    Args:
        exc (InvalidCredentialsException): The raised InvalidCredentialsException.

    Returns:
        JSONResponse: The response with an appropriate status code and message.
    """
    logging.getLogger("uvicorn").info(msg=exc, exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "message": f"Incorrect {'' if exc.only_password else 'email or '}password."
        },
    )


async def jwt_tokens_exception_handler(
    _: Request, exc: JWTTokensException
) -> JSONResponse:
    """App-wide JWTTokensException handler.

    Args:
        exc (JWTTokensException): The raised JWTTokensException.

    Returns:
        JSONResponse: The response with an appropriate status code and message.
    """
    response = JSONResponse(
        status_code=status.HTTP_401_UNAUTHORIZED, content={"message": exc.message}
    )
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    response.delete_cookie("xsrf_access_token")
    response.delete_cookie("xsrf_refresh_token")
    return response


async def request_validation_exception_handler(
    _: Request, exc: RequestValidationError
) -> JSONResponse:
    """App-wide RequestValidationError handler, provides the request body alongside
    the default information.

    Args:
        exc (RequestValidationError): The raised RequestValidationError.

    Returns:
        JSONResponse: The response with an appropriate status code and content.
    """
    details = {"detail": exc.errors(), "body": exc.body}
    logging.getLogger("uvicorn").info(details)
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder(details),
    )
