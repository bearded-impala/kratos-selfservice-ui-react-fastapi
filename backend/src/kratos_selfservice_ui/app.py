import os

from fastapi import FastAPI

from kratos_selfservice_ui.proxy import build_lifespan, router as proxy_router


def create_app() -> FastAPI:
    kratos_public_url = os.environ["KRATOS_PUBLIC_URL"]
    app = FastAPI(lifespan=build_lifespan(kratos_public_url))

    @app.get("/health")
    def health() -> dict[str, str]:
        return {"status": "ok"}

    app.include_router(proxy_router)
    return app
