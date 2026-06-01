from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

import httpx
from fastapi import APIRouter, FastAPI, Request, Response

# Hop-by-hop headers (RFC 7230) plus a few that httpx must compute itself.
_STRIP_REQUEST_HEADERS = {
    "host",
    "content-length",
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
}
_STRIP_RESPONSE_HEADERS = {
    "content-encoding",
    "content-length",
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
}


def build_lifespan(kratos_public_url: str):
    @asynccontextmanager
    async def lifespan(app: FastAPI) -> AsyncIterator[None]:
        async with httpx.AsyncClient(base_url=kratos_public_url) as client:
            app.state.kratos_client = client
            yield

    return lifespan


router = APIRouter()


@router.api_route(
    "/self-service/{path:path}",
    methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
)
async def proxy(path: str, request: Request) -> Response:
    client: httpx.AsyncClient = request.app.state.kratos_client
    headers = {
        k: v for k, v in request.headers.items()
        if k.lower() not in _STRIP_REQUEST_HEADERS
    }
    body = await request.body()
    upstream = await client.request(
        request.method,
        f"/self-service/{path}",
        params=request.query_params,
        headers=headers,
        content=body,
        follow_redirects=False,
    )
    response_headers = [
        (k, v) for k, v in upstream.headers.multi_items()
        if k.lower() not in _STRIP_RESPONSE_HEADERS
    ]
    return Response(
        content=upstream.content,
        status_code=upstream.status_code,
        headers=dict(response_headers),
    )
