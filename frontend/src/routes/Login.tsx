import { FlowType, type LoginFlow } from "@ory/client-fetch";
import { Login } from "@ory/elements-react/theme";
import { oryClient, oryConfig } from "../ory";
import { useFlow } from "../hooks/useFlow";

export function LoginPage() {
  const flow = useFlow<LoginFlow>(FlowType.Login, (id) =>
    oryClient.getLoginFlowRaw({ id }).then((res) => res.value()),
  );

  if (!flow) return null;

  return <Login flow={flow} config={oryConfig} />;
}
