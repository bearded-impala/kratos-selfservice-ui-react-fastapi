import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { type LoginFlow } from "@ory/client-fetch";
import { Login } from "@ory/elements-react/theme";
import { oryClient, oryConfig } from "../ory";

export function LoginPage() {
  const [params] = useSearchParams();
  const flowId = params.get("flow");
  const [flow, setFlow] = useState<LoginFlow | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!flowId) {
      window.location.replace("/self-service/login/browser");
      return;
    }
    oryClient
      .getLoginFlowRaw({ id: flowId })
      .then((res) => res.value())
      .then(setFlow)
      .catch(() => {
        // unrecoverable — restart by initializing a new flow
        window.location.replace("/self-service/login/browser");
      });
  }, [flowId]);

  if (error) return <div>{error}</div>;
  if (!flow) return null;

  return <Login flow={flow} config={oryConfig} />;
}
