# Kratos Self-Service UI — React + FastAPI

A reference self-service UI for [Ory Kratos](https://www.ory.sh/kratos/), built
as a **mountable FastAPI app** that serves a **Vite + React SPA** powered by
[`@ory/elements-react`](https://github.com/ory/elements).

Drop-in replacement for
[`oryd/kratos-selfservice-ui-node`](https://github.com/ory/kratos-selfservice-ui-node).

---

## Prerequisites

- **Reopen in Container:**
- **A running Ory Kratos:** This repo does not manage Kratos, BYOK. Make sure its **public** port is reachable from this UI process and that its self-service flow `ui_url`s point back at where you run this UI (default `http://127.0.0.1:4455/<flow>`).
  
---

## Quickstart

```bash
uv sync
poe up   # installs frontend, builds SPA, runs UI on :4455
```

UI is now on **http://127.0.0.1:4455**, proxying to the Kratos public API at
`KRATOS_PUBLIC_URL` (defaults to `http://host.docker.internal:4433`).

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

## Configuration

Two environment variables:

| Variable            | Required? | Purpose                                         |
|---------------------|-----------|-------------------------------------------------|
| `KRATOS_PUBLIC_URL` | yes       | Kratos public endpoint to proxy (e.g. `http://host.docker.internal:4433`) |
| `PORT`              | no (4455) | Port the UI listens on                          |

> `poe dev` defaults `KRATOS_PUBLIC_URL=http://host.docker.internal:4433` and `PORT=4455` for convenience.

To point at a different Kratos:

```bash
KRATOS_PUBLIC_URL=http://kratos.local:4433 poe dev
```

On the Kratos side, your `kratos.yml` must set the self-service flow `ui_url`s to this UI — e.g.:

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

And CORS must allow the UI origin:

```yaml
serve:
  public:
    cors:
      enabled: true
      allowed_origins: [http://127.0.0.1:4455]
      allow_credentials: true
```

---

## Tasks

All workflow commands are defined in [poe.toml](poe.toml)

```bash
poe --help            # list tasks
poe -d <task>         # dry-run (print the resolved command)
```

---

## Run as container

```bash
poe docker-build
KRATOS_PUBLIC_URL=http://host.docker.internal:4433 poe docker-run
```
