import { FlowType, type RegistrationFlow } from "@ory/client-fetch";
import { Registration } from "@ory/elements-react/theme";
import { oryClient, oryConfig } from "../ory";
import { useFlow } from "../hooks/useFlow";

export function RegistrationPage() {
  const flow = useFlow<RegistrationFlow>(FlowType.Registration, (id) =>
    oryClient.getRegistrationFlowRaw({ id }).then((res) => res.value()),
  );

  if (!flow) return null;

  return <Registration flow={flow} config={oryConfig} />;
}
