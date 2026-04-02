# Deploying Course Co-Pilot on Railway

This repo ships a **Dockerfile** that builds the React app and runs **one** Python service: the UI at `/` and the FastAPI app under **`/api`** (same as local Vite’s `/api` proxy).

## One-click path

1. Create a **new project** on Railway → **Deploy from GitHub** → select `courseCopilot`.
2. Railway should detect `railway.toml` and build with the Dockerfile (no extra build command needed).
3. Set **environment variables** below (at least `OPENAI_API_KEY` if you use the transcript pipeline).
4. After deploy, open your **public URL** — the SPA and `/api/docs` should load on the same host.

## Health check

`railway.toml` points the health check at **`GET /health`** (lightweight JSON). Detailed API health remains at **`GET /api/health`**.

## Environment variables

Set these in **Railway → your service → Variables** (names are case-insensitive for most keys Pydantic accepts).

| Variable | Required | Purpose |
|----------|----------|---------|
| `PORT` | No | Railway sets this automatically. Do not override unless you know why. |
| `OPENAI_API_KEY` | For transcript / research features | Used by the pipeline and research agent (`core.config`). Without it, transcript evaluation returns errors when those endpoints run. |
| `DEBUG` | No | Set to `false` in production. Default in code may be `true`. |
| `DEFAULT_CSV_PATH` | No | Path to the syllabus CSV inside the container. Default: `data/syllabus_dataset.csv` (file is copied in the image). |
| `SOURCE_UNIVERSITY` / `TARGET_UNIVERSITY` | No | Defaults for matching (`core.config`). |
| `ANTHROPIC_API_KEY` | Optional | If you wire summarization through Anthropic in your deployment. |

Optional tuning (same as local `.env`):

- `TOP_N_MATCHES`, `SIMILARITY_THRESHOLD`, `EMBEDDING_MODEL`, etc. — see `core/config.py` for all settings.

### Hugging Face / sentence-transformers cache

First request can download embedding weights (slow, large). You may set:

- `HF_HOME` or `TRANSFORMERS_CACHE` to a writable path if you attach a **Railway volume** later.

On the free tier, disk is ephemeral; expect a cold start after redeploys.

## Costs and cold starts

The image includes **sentence-transformers** and PyTorch dependencies — builds are heavy and RAM usage is non-trivial. Choose an instance size that fits PyTorch + your CSV in memory.

## Custom domain

Add your domain under **Railway → Settings → Networking** and point DNS as Railway instructs. No extra app config is required for same-origin `/api` calls.
