"""
Railway/production entry: uvicorn reads PORT from the environment (no shell $PORT).
"""
import os

import uvicorn

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8000"))
    uvicorn.run("serve:root_app", host="0.0.0.0", port=port)
