import os

from fastapi import FastAPI

from kratos_selfservice_ui.proxy import build_lifespan, proxy_router
from kratos_selfservice_ui.spa import mount_spa


def create_app() -> FastAPI:
    kratos_public_url = os.environ["KRATOS_PUBLIC_URL"]
    app = FastAPI(lifespan=build_lifespan(kratos_public_url))

    @app.get("/health")
    def health() -> dict[str, str]:
        return {"status": "ok"}

    app.include_router(proxy_router)
    mount_spa(app)

    return app
