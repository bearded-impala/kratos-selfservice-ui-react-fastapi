import { type RegistrationFlow } from "@ory/client-fetch";
import { Registration } from "@ory/elements-react/theme";
import { oryClient, oryConfig } from "../ory";
import { useFlow } from "../hooks/useFlow";
import { FlowType } from "../constants/routes";

export function RegistrationPage() {
  const flow = useFlow<RegistrationFlow>(FlowType.REGISTRATION, (id) =>
    oryClient.getRegistrationFlowRaw({ id }).then((res) => res.value()),
  );

  if (!flow) return null;

  return <Registration flow={flow} config={oryConfig} />;
}
