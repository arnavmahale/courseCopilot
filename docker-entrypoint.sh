#!/bin/sh
set -e
cd /app
# Railway sets PORT in the container env — never pass "$PORT" from a non-shell start command.
port="${PORT:-8000}"
exec uvicorn serve:root_app --host 0.0.0.0 --port "$port"
