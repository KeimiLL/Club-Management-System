"""File containing exception handlers."""


from app.core.exceptions import (
    DuplicateException,
    InvalidCredentialsException,
    JWTTokensException,
    MissingException,
)
from app.schemas.enums import HTTPResponseMessage
from fastapi import Request
from fastapi.responses import JSONResponse


async def missing_exception_handler(_: Request, exc: MissingException) -> JSONResponse:
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


async def sqlalchemyerror_handler(*_) -> JSONResponse:
    """App-wide SQLAlchemyError handler.

    Returns:
        JSONResponse: The response with an appropriate status code and message.
    """
    return JSONResponse(
        status_code=409,
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
    return JSONResponse(
        status_code=400,
        content={
            "message": f"Incorrect {'' if exc.only_password else 'email or '}password."
        },
    )


async def jwt_tokens_exception_handler(_: Request, exc: JWTTokensException):
    """App-wide JWTTokensException handler.

    Returns:
        JSONResponse: The response with an appropriate status code and message.
    """
    response = JSONResponse(status_code=401, content={"message": exc.message})
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    response.delete_cookie("xsrf_access_token")
    response.delete_cookie("xsrf_refresh_token")
    return response
