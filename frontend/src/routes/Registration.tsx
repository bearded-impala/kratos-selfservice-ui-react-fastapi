import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { type RegistrationFlow } from "@ory/client-fetch";
import { Registration } from "@ory/elements-react/theme";
import { oryClient, oryConfig } from "../ory";

export function RegistrationPage() {
  const [params] = useSearchParams();
  const flowId = params.get("flow");
  const [flow, setFlow] = useState<RegistrationFlow | null>(null);

  useEffect(() => {
    if (!flowId) {
      window.location.replace("/self-service/registration/browser");
      return;
    }
    oryClient
      .getRegistrationFlowRaw({ id: flowId })
      .then((res) => res.value())
      .then(setFlow)
      .catch(() => {
        window.location.replace("/self-service/registration/browser");
      });
  }, [flowId]);

  if (!flow) return null;

  return <Registration flow={flow} config={oryConfig} />;
}
