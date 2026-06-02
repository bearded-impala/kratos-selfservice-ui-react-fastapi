import { type RecoveryFlow } from "@ory/client-fetch";
import { Recovery } from "@ory/elements-react/theme";
import { oryClient, oryConfig } from "../ory";
import { useFlow } from "../hooks/useFlow";
import { FlowType } from "../constants/routes";

export function RecoveryPage() {
  const flow = useFlow<RecoveryFlow>(FlowType.RECOVERY, (id) =>
    oryClient.getRecoveryFlowRaw({ id }).then((res) => res.value()),
  );

  if (!flow) return null;

  return <Recovery flow={flow} config={oryConfig} />;
}
