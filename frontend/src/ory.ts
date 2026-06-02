import { Configuration, FrontendApi } from "@ory/client-fetch";
import type { OryClientConfiguration } from "@ory/elements-react";

// Same-origin: the FastAPI app proxies /self-service/* and /sessions/* to Kratos.
export const oryClient = new FrontendApi(
  new Configuration({
    basePath: "",
    headers: { Accept: "application/json" },
  }),
);

// elements-react merges `project` over a runtime `defaultProject` that already supplies every field.
export const oryConfig = {
  project: {
    login_ui_url: "/login",
    registration_ui_url: "/registration",
    recovery_ui_url: "/recovery",
    verification_ui_url: "/verification",
    settings_ui_url: "/settings",
    error_ui_url: "/error",
  },
} as OryClientConfiguration;
