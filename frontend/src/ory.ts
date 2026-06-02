import { Configuration, FrontendApi } from "@ory/client-fetch"
import type { OryClientConfiguration } from "@ory/elements-react"
import type { AccountExperienceConfiguration } from "@ory/client-fetch"

// Same-origin: the FastAPI app proxies /self-service/* and /sessions/* to Kratos.
export const oryClient = new FrontendApi(
  new Configuration({
    basePath: "",
    headers: { Accept: "application/json" },
  }),
)

// @ory/elements-react expects an AccountExperienceConfiguration (a type designed
// for Ory Network projects). For self-hosted Kratos there is no such object, so
// we stub the required fields. UI URLs point at our own SPA routes.
const project: AccountExperienceConfiguration = {
  name: "Kratos Self-Service UI",
  default_locale: "en",
  locale_behavior: "force_default",
  default_redirect_url: "/",
  login_ui_url: "/login",
  registration_ui_url: "/registration",
  recovery_ui_url: "/recovery",
  verification_ui_url: "/verification",
  settings_ui_url: "/settings",
  error_ui_url: "/error",
  registration_enabled: true,
  recovery_enabled: true,
  verification_enabled: true,
}

export const oryConfig: OryClientConfiguration = { project }
