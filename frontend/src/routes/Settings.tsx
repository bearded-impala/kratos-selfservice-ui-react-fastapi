import { FlowType, type SettingsFlow } from "@ory/client-fetch";
import { Settings } from "@ory/elements-react/theme";
import { oryClient, oryConfig } from "../ory";
import { useFlow } from "../hooks/useFlow";

export function SettingsPage() {
  const flow = useFlow<SettingsFlow>(FlowType.Settings, (id) =>
    oryClient.getSettingsFlowRaw({ id }).then((res) => res.value()),
  );

  if (!flow) return null;

  return <Settings flow={flow} config={oryConfig} />;
}
