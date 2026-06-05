import { Configuration, FrontendApi } from "@ory/client-fetch";
import type { OryClientConfiguration } from "@ory/elements-react";
import { basePath, withBase } from "./basePath";

export const oryClient = new FrontendApi(
  new Configuration({
    basePath,
    headers: { Accept: "application/json" },
  }),
);

const overrides: Partial<OryClientConfiguration> = JSON.parse(
  document.querySelector<HTMLMetaElement>('meta[name="ory-config"]')?.content ||
    "{}",
);

export const oryConfig = {
  ...overrides,
  sdk: {
    url: basePath || window.location.origin,
    ...(overrides.sdk ?? {}),
  },
  project: {
    login_ui_url: withBase("/login"),
    registration_ui_url: withBase("/registration"),
    recovery_ui_url: withBase("/recovery"),
    verification_ui_url: withBase("/verification"),
    settings_ui_url: withBase("/settings"),
    error_ui_url: withBase("/error"),
    ...(overrides.project ?? {}),
  },
} as OryClientConfiguration;
