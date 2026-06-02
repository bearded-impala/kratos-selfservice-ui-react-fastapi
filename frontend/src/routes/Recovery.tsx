import { type RecoveryFlow } from "@ory/client-fetch";
import { Recovery } from "@ory/elements-react/theme";
import { oryClient, oryConfig } from "../ory";
import { useFlow } from "../hooks/useFlow";

export function RecoveryPage() {
  const flow = useFlow("recovery", (id) =>
    oryClient.getRecoveryFlowRaw({ id }).then((res) => res.value()),
  );

  if (!flow) return null;

  return <Recovery flow={flow} config={oryConfig} />;
}
