from kratos_selfservice_ui.app import create_app
from kratos_selfservice_ui.proxy import build_lifespan, combine_lifespans, proxy_router
from kratos_selfservice_ui.spa import mount_spa

__all__ = [
    "build_lifespan",
    "combine_lifespans",
    "create_app",
    "mount_spa",
    "proxy_router",
]
