# ---- Frontend build ----
FROM node:24-alpine AS frontend
WORKDIR /build
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build


FROM python:3.14-alpine AS builder
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv
ENV UV_LINK_MODE=copy \
    UV_PROJECT_ENVIRONMENT=/opt/venv \
    UV_COMPILE_BYTECODE=1 \
    UV_PYTHON_DOWNLOADS=never
WORKDIR /build
COPY pyproject.toml uv.lock README.md LICENSE ./
RUN uv sync --frozen --no-dev --no-install-project --python /usr/local/bin/python

# ---- Runtime ----
FROM python:3.14-alpine AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH=/opt/venv/bin:$PATH \
    PYTHONPATH=/usr/src/app/backend/src \
    PORT=4455

RUN addgroup -S ory && \
    adduser -S -u 10000 -G ory -H -s /sbin/nologin ory && \
    mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY --from=builder /opt/venv /opt/venv
COPY backend/ ./backend/
COPY --from=frontend /build/dist ./frontend/dist

USER 10000
EXPOSE 4455
CMD ["python", "-m", "kratos_selfservice_ui"]
