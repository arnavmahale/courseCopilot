FROM python:3.11-slim

# Node for Vite; poppler for pdf2image (transcript PDF → images for vision)
RUN apt-get update && apt-get install -y --no-install-recommends curl poppler-utils \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Explicit copy so the file is always in the image (avoids missing /app/docker-entrypoint.sh on some hosts).
COPY run_server.py /app/run_server.py

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci

COPY frontend/ ./frontend/
RUN cd frontend && npm run build

COPY . .

ENV PYTHONUNBUFFERED=1
EXPOSE 8000

# Python reads os.environ["PORT"] — works when Railway does not expand $PORT in the start command.
CMD ["python", "/app/run_server.py"]
