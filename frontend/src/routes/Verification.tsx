import { type VerificationFlow } from "@ory/client-fetch";
import { Verification } from "@ory/elements-react/theme";
import { oryClient, oryConfig } from "../ory";
import { useFlow } from "../hooks/useFlow";
import { FlowType } from "../constants/routes";

export function VerificationPage() {
  const flow = useFlow(FlowType.VERIFICATION, (id) =>
    oryClient.getVerificationFlowRaw({ id }).then((res) => res.value()),
  );

  if (!flow) return null;

  return <Verification flow={flow} config={oryConfig} />;
}
