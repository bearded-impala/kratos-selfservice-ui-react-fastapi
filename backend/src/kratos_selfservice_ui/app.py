import os

from fastapi import FastAPI

from kratos_selfservice_ui.proxy import build_lifespan, proxy_router
from kratos_selfservice_ui.spa import mount_spa


def create_app() -> FastAPI:
    kratos_public_url = os.environ["KRATOS_PUBLIC_URL"]
    base_path = os.environ.get("KRATOS_UI_BASE_PATH", "").rstrip("/")
    app = FastAPI(lifespan=build_lifespan(kratos_public_url))

    @app.get("/health")
    def health() -> dict[str, str]:
        return {"status": "ok"}

    if base_path:
        app.include_router(proxy_router, prefix=base_path)
        mount_spa(app, prefix=base_path)
    app.include_router(proxy_router)
    mount_spa(app, public_prefix=base_path)

    return app
