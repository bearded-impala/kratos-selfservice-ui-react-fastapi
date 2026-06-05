# Kratos Self-Service UI: Ory Elements React + FastAPI

A reference self-service UI for [Ory Kratos](https://www.ory.sh/kratos/), built
as a **mountable FastAPI app** that serves a **Vite + React SPA** powered by
[`@ory/elements-react`](https://github.com/ory/elements).

Drop-in replacement for
[`oryd/kratos-selfservice-ui-node`](https://github.com/ory/kratos-selfservice-ui-node).

---

## Prerequisites

- **Reopen in Container:**
  - Windows/Linux: `Ctrl + Shift + P` OR macOS: `Cmd + Shift + P`
  - Type `Reopen in Container`
  - Select the command `Dev Containers: Reopen in Container`

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

| Variable             | Required? | Purpose                                         |
|----------------------|-----------|-------------------------------------------------|
| `KRATOS_PUBLIC_URL`  | yes       | Kratos public endpoint to proxy (e.g. `http://host.docker.internal:4433`) |
| `PORT`               | no (4455) | Port the UI listens on                          |
| `ORY_CONFIG`         | no (`{}`) | JSON merged into the SPA's `OryClientConfiguration`. Use `project.*` for branding (`name`, `logo_light_url`, ...) and `intl.*` for locale / `customTranslations`. E.g. `{"project":{"name":"Acme","logo_light_url":"/branding/acme.svg"},"intl":{"locale":"de"}}`. |

### Build Once
```bash
poe docker-build
```

### Run anyhow

1. Point to any Kratos
```bash
KRATOS_PUBLIC_URL=http://host.docker.internal:4433 \
poe docker-run
```

2. Ory Config
```bash
KRATOS_PUBLIC_URL=http://host.docker.internal:4433 \
ORY_CONFIG='{"project":{"name":"Company", "logo_light_url":"https://www.svgrepo.com/download/330413/fastapi.svg"},"intl":{"locale":"en"}}' \
poe docker-run
```

3.  Docker compose
```bash
docker compose up
```
