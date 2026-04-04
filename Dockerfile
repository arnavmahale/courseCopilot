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

RUN chmod +x /app/docker-entrypoint.sh

ENV PYTHONUNBUFFERED=1
EXPOSE 8000

# ENTRYPOINT survives many host overrides; PORT is read inside the script (no shell expansion needed).
ENTRYPOINT ["/app/docker-entrypoint.sh"]
