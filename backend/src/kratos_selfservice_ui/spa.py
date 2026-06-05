import html
import json
import os
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

_FRONTEND_DIST = Path(__file__).resolve().parents[3] / "frontend" / "dist"

_BASE_PLACEHOLDER = "__BASE__"
_CONFIG_PLACEHOLDER = "__ORY_CONFIG__"


def _normalize_prefix(prefix: str) -> str:
    if prefix in ("", "/"):
        return ""
    if not prefix.startswith("/"):
        raise ValueError(f"prefix must start with '/' (got {prefix!r})")
    return prefix.rstrip("/")


def mount_spa(app: FastAPI, prefix: str = "") -> None:
    prefix = _normalize_prefix(prefix)

    config_json = os.environ.get("ORY_CONFIG", "").strip() or "{}"
    json.loads(config_json)

    raw = (_FRONTEND_DIST / "index.html").read_text(encoding="utf-8")
    rendered = raw.replace(_BASE_PLACEHOLDER, prefix).replace(
        _CONFIG_PLACEHOLDER, html.escape(config_json, quote=True)
    )

    app.mount(
        f"{prefix}/assets",
        StaticFiles(directory=_FRONTEND_DIST / "assets"),
        name="kratos_ui_assets",
    )

    @app.get(f"{prefix}/{{full_path:path}}", include_in_schema=False)
    def spa_fallback(full_path: str) -> HTMLResponse:
        return HTMLResponse(rendered)
