# Kratos Self-Service UI: Ory Elements React + FastAPI

A reference self-service UI for [Ory Kratos](https://www.ory.sh/kratos/), built
as a **mountable FastAPI app** that serves a **Vite + React SPA** powered by
[`@ory/elements-react`](https://github.com/ory/elements).

Drop-in replacement for
[`oryd/kratos-selfservice-ui-node`](https://github.com/ory/kratos-selfservice-ui-node).

---

## Prerequisites

- **Reopen in Container:**

- **Ory Kratos:**
This repo does not manage Kratos, BYOK. Make sure its **public** port is reachable from this UI process and that its self-service flow `ui_url`s point back at where you run this UI (default `http://127.0.0.1:4455/<flow>`).
  
`kratos.yml` must set the self-service flow `ui_url`s to this UI like follows:

```yaml
selfservice:
  default_browser_return_url: http://127.0.0.1:4455/
  allowed_return_urls: [http://127.0.0.1:4455]
  flows:
    login:        { ui_url: http://127.0.0.1:4455/login }
    registration: { ui_url: http://127.0.0.1:4455/registration }
    recovery:     { ui_url: http://127.0.0.1:4455/recovery }
    verification: { ui_url: http://127.0.0.1:4455/verification }
    settings:     { ui_url: http://127.0.0.1:4455/settings }
    error:        { ui_url: http://127.0.0.1:4455/error }
```
  
---

## Quickstart

```bash
uv sync
poe up   # installs frontend, builds SPA, runs UI on :4455
```


UI is now on **http://127.0.0.1:4455**

`poe dev` defaults `KRATOS_PUBLIC_URL=http://host.docker.internal:4433` and `PORT=4455` for convenience.

To point at a different Kratos:

```bash
KRATOS_PUBLIC_URL=http://kratos.local:4433 poe dev
```

Test routes in a browser:

| Route          | URL                                        |
|----------------|--------------------------------------------|
| Login          | http://127.0.0.1:4455/login                |
| Registration   | http://127.0.0.1:4455/registration         |
| Recovery       | http://127.0.0.1:4455/recovery             |
| Verification   | http://127.0.0.1:4455/verification         |
| Settings       | http://127.0.0.1:4455/settings             |
| Error          | http://127.0.0.1:4455/error                |

Each route auto-redirects to `?flow=<id>` after Kratos issues the flow, then
renders the corresponding `@ory/elements-react` component.

---


## Run as container

Two environment variables:

| Variable            | Required? | Purpose                                         |
|---------------------|-----------|-------------------------------------------------|
| `KRATOS_PUBLIC_URL` | yes       | Kratos public endpoint to proxy (e.g. `http://host.docker.internal:4433`) |
| `PORT`              | no (4455) | Port the UI listens on                          |


```bash
poe docker-build
KRATOS_PUBLIC_URL=http://host.docker.internal:4433 poe docker-run
```

## Docker compose reference

Pulls the published image from GHCR:

```yaml
...
services:
  kratos-selfservice-ui:
    image: ghcr.io/bearded-impala/kratos-selfservice-ui-react-fastapi:latest
    ports: ["4455:4455"]
    environment:
      KRATOS_PUBLIC_URL: http://host.docker.internal:4433
...
```
