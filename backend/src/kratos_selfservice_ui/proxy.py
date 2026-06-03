from collections.abc import AsyncIterator, Callable
from contextlib import AsyncExitStack, asynccontextmanager
from typing import Any

import httpx
from fastapi import APIRouter, FastAPI, Request
from starlette.background import BackgroundTask
from starlette.responses import StreamingResponse

Lifespan = Callable[[FastAPI], Any]

_HOP_BY_HOP = frozenset({
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
})

_HTTPX_MANAGED_REQUEST_HEADERS = frozenset({"host", "content-length"})

_STRIP_REQUEST_HEADERS = _HOP_BY_HOP | _HTTPX_MANAGED_REQUEST_HEADERS


def build_lifespan(kratos_public_url: str):
    @asynccontextmanager
    async def lifespan(app: FastAPI) -> AsyncIterator[None]:
        async with httpx.AsyncClient(base_url=kratos_public_url) as client:
            app.state.kratos_client = client
            yield

    return lifespan


def combine_lifespans(*lifespans: Lifespan) -> Lifespan:
    @asynccontextmanager
    async def combined(app: FastAPI) -> AsyncIterator[None]:
        async with AsyncExitStack() as stack:
            for lifespan in lifespans:
                await stack.enter_async_context(lifespan(app))
            yield

    return combined


router = APIRouter()
proxy_router = router  # public alias for composition


async def _forward(upstream_path: str, request: Request) -> StreamingResponse:
    client: httpx.AsyncClient = request.app.state.kratos_client
    upstream_req = client.build_request(
        request.method,
        upstream_path,
        params=request.query_params,
        headers={
            k: v for k, v in request.headers.items()
            if k.lower() not in _STRIP_REQUEST_HEADERS
        },
        content=await request.body(),
    )
    upstream = await client.send(upstream_req, stream=True, follow_redirects=False)

    response = StreamingResponse(
        upstream.aiter_raw(),
        status_code=upstream.status_code,
        background=BackgroundTask(upstream.aclose),
    )
    # Starlette's headers Mapping can't hold duplicate keys, so we append
    # straight onto raw_headers to preserve the multiple Set-Cookie lines
    # Kratos emits (csrf rotation + session + continuity cleanup).
    response.raw_headers = [
        (k.lower().encode("latin-1"), v.encode("latin-1"))
        for k, v in upstream.headers.multi_items()
        if k.lower() not in _HOP_BY_HOP
    ]
    return response


_PROXY_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"]


@router.api_route("/self-service/{path:path}", methods=_PROXY_METHODS)
async def proxy_self_service(path: str, request: Request) -> StreamingResponse:
    return await _forward(f"/self-service/{path}", request)


@router.api_route("/sessions/{path:path}", methods=_PROXY_METHODS)
async def proxy_sessions(path: str, request: Request) -> StreamingResponse:
    return await _forward(f"/sessions/{path}", request)
