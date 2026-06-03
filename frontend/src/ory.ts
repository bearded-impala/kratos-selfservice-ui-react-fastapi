import { Configuration, FrontendApi } from "@ory/client-fetch";
import type { OryClientConfiguration } from "@ory/elements-react";
import { basePath, withBase } from "./basePath";

// Same-origin: the FastAPI app proxies /self-service/* and /sessions/* to Kratos.
export const oryClient = new FrontendApi(
  new Configuration({
    basePath,
    headers: { Accept: "application/json" },
  }),
);

// elements-react merges `project` over a runtime `defaultProject` that already supplies every field.
export const oryConfig = {
  project: {
    login_ui_url: withBase("/login"),
    registration_ui_url: withBase("/registration"),
    recovery_ui_url: withBase("/recovery"),
    verification_ui_url: withBase("/verification"),
    settings_ui_url: withBase("/settings"),
    error_ui_url: withBase("/error"),
  },
} as OryClientConfiguration;
