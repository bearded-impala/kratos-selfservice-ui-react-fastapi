import { type SettingsFlow } from "@ory/client-fetch";
import { Settings } from "@ory/elements-react/theme";
import { oryClient, oryConfig } from "../ory";
import { useFlow } from "../hooks/useFlow";
import { FlowType } from "../constants/routes";

export function SettingsPage() {
  const flow = useFlow(FlowType.SETTINGS, (id) =>
    oryClient.getSettingsFlowRaw({ id }).then((res) => res.value()),
  );

  if (!flow) return null;

  return <Settings flow={flow} config={oryConfig} />;
}
