"""File containing middlewares."""


import http
import time
from logging import Logger

from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint


class LogRequestMiddleware(BaseHTTPMiddleware):
    """Middleware for custom request logging."""

    def __init__(self, app, logger: Logger):
        super().__init__(app)
        self.logger = logger

    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        """Logs all requests, including their processing time.

        Args:
            request (Request): The incoming request.
            call_next (RequestResponseEndpoint): A function that passes the request
                to the path operation and returns the response.

        Returns:
            Response: The endpoint response.
        """
        url = (
            f"{request.url.path}?{request.query_params}"
            if request.query_params
            else request.url.path
        )
        start_time = time.time()
        response = await call_next(request)
        process_time = (time.time() - start_time) * 1000
        formatted_process_time = f"{process_time:.2f}"
        host = getattr(getattr(request, "client", None), "host", None)
        port = getattr(getattr(request, "client", None), "port", None)
        try:
            status_phrase = http.HTTPStatus(response.status_code).phrase
        except ValueError:
            status_phrase = ""
        self.logger.info(
            '%s:%s - "%s %s" %s %s %sms',
            host,
            port,
            request.method,
            url,
            response.status_code,
            status_phrase,
            formatted_process_time,
        )
        return response
