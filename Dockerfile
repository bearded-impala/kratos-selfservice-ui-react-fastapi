FROM node:24-alpine AS frontend
WORKDIR /build
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM ghcr.io/astral-sh/uv:python3.14-bookworm-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_LINK_MODE=copy \
    UV_PROJECT_ENVIRONMENT=/opt/venv \
    PATH=/opt/venv/bin:$PATH \
    PYTHONPATH=/usr/src/app/backend/src \
    PORT=4455

RUN mkdir -p /usr/src/app && \
    useradd --system --uid 10000 --no-create-home --shell /usr/sbin/nologin ory
WORKDIR /usr/src/app

COPY pyproject.toml uv.lock README.md LICENSE ./
RUN uv sync --frozen --no-dev --no-install-project

COPY backend/ ./backend/
COPY --from=frontend /build/dist ./frontend/dist

USER 10000
EXPOSE 4455
CMD ["python", "-m", "kratos_selfservice_ui"]
