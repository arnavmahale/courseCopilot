"""
Production entry point.
Mounts the FastAPI API at /api and serves the React SPA.
Railway liveness: GET /health (root; does not depend on /api mount).
"""
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from api.main import app as api_app


@asynccontextmanager
async def root_lifespan(app: FastAPI):
    """Run api_app startup/shutdown (on_event handlers) when mounted."""
    async with api_app.router.lifespan_context(api_app):
        yield


root_app = FastAPI(lifespan=root_lifespan, docs_url=None, redoc_url=None)


@root_app.get("/health")
async def railway_health():
    return {"status": "ok"}


root_app.mount("/api", api_app)

_DIST = os.path.join(os.path.dirname(os.path.abspath(__file__)), "frontend", "dist")

if os.path.isdir(_DIST):
    _ASSETS = os.path.join(_DIST, "assets")
    if os.path.isdir(_ASSETS):
        root_app.mount("/assets", StaticFiles(directory=_ASSETS), name="assets")

    @root_app.get("/{full_path:path}", include_in_schema=False)
    async def serve_spa(full_path: str):
        return FileResponse(os.path.join(_DIST, "index.html"))
