import {
  Configuration,
  FrontendApi,
  type AccountExperienceConfiguration,
} from "@ory/client-fetch";
import type { OryClientConfiguration } from "@ory/elements-react";

// Same-origin: the FastAPI app proxies /self-service/* and /sessions/* to Kratos.
export const oryClient = new FrontendApi(
  new Configuration({
    basePath: "",
    headers: { Accept: "application/json" },
  }),
);

// `OryClientConfiguration.project` is typed as `AccountExperienceConfiguration`,
// an Ory Network-only object. For self-hosted Kratos only the UI URLs, name,
// locale and *_enabled flags are actually consumed by elements-react, so we cast
// a minimal object instead of stubbing every required field.
export const oryConfig: OryClientConfiguration = {
  project: {
    name: "Kratos Self-Service UI",
    default_locale: "en",
    login_ui_url: "/login",
    registration_ui_url: "/registration",
    recovery_ui_url: "/recovery",
    verification_ui_url: "/verification",
    settings_ui_url: "/settings",
    error_ui_url: "/error",
    registration_enabled: true,
    recovery_enabled: true,
    verification_enabled: true,
  } as AccountExperienceConfiguration,
};
