FROM python:3.11-slim

# Node for Vite; poppler for pdf2image (transcript PDF → images for vision)
RUN apt-get update && apt-get install -y --no-install-recommends curl poppler-utils \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci

COPY frontend/ ./frontend/
RUN cd frontend && npm run build

COPY . .

ENV PYTHONUNBUFFERED=1
EXPOSE 8000

# JSON + shell so Railway's PORT is expanded (plain CMD can be overridden badly in some setups)
CMD ["sh", "-c", "exec uvicorn serve:root_app --host 0.0.0.0 --port ${PORT:-8000}"]
