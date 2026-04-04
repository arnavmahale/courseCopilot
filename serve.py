"""
Production entry point.
Mounts the FastAPI app at /api and serves the React frontend for all other paths.
"""
import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from api.main import app as api_app

root_app = FastAPI(docs_url=None, redoc_url=None)

# Mount the entire API under /api
root_app.mount("/api", api_app)

# Serve React static assets
_DIST = os.path.join(os.path.dirname(os.path.abspath(__file__)), "frontend", "dist")

if os.path.isdir(_DIST):
    _ASSETS = os.path.join(_DIST, "assets")
    if os.path.isdir(_ASSETS):
        root_app.mount("/assets", StaticFiles(directory=_ASSETS), name="assets")

    @root_app.get("/{full_path:path}", include_in_schema=False)
    async def serve_spa(full_path: str):
        return FileResponse(os.path.join(_DIST, "index.html"))
