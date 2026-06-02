import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { type SettingsFlow } from "@ory/client-fetch";
import { Settings } from "@ory/elements-react/theme";
import { oryClient, oryConfig } from "../ory";

export function SettingsPage() {
  const [params] = useSearchParams();
  const flowId = params.get("flow");
  const [flow, setFlow] = useState<SettingsFlow | null>(null);

  useEffect(() => {
    if (!flowId) {
      window.location.replace("/self-service/settings/browser");
      return;
    }
    oryClient
      .getSettingsFlowRaw({ id: flowId })
      .then((res) => res.value())
      .then(setFlow)
      .catch(() => {
        window.location.replace("/self-service/settings/browser");
      });
  }, [flowId]);

  if (!flow) return null;

  return <Settings flow={flow} config={oryConfig} />;
}
