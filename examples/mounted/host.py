"""Minimal host FastAPI app embedding the Kratos UI under /backend.

Run from the repo root:

    KRATOS_PUBLIC_URL=http://host.docker.internal:4433 \\
        uv run uvicorn examples.mounted.host:app --port 4455

Browse:
    /            -> host's own page
    /backend/login  -> embedded Kratos UI

Kratos `ui_url`s must point at /backend/<flow> on this host (not /<flow>).
"""

import os
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.responses import HTMLResponse

from kratos_selfservice_ui import (
    build_lifespan,
    combine_lifespans,
    mount_spa,
    proxy_router,
)

MOUNT = "/backend"

ui_lifespan = build_lifespan(os.environ["KRATOS_PUBLIC_URL"])


@asynccontextmanager
async def host_lifespan(app: FastAPI) -> AsyncIterator[None]:
    # Pretend the host has its own startup work (DB pool, etc.).
    yield


app = FastAPI(lifespan=combine_lifespans(host_lifespan, ui_lifespan))


@app.get("/", response_class=HTMLResponse)
def index() -> str:
    return f'<a href="{MOUNT}/login">Sign in</a>'


app.include_router(proxy_router, prefix=MOUNT)
mount_spa(app, prefix=MOUNT)
