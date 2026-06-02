import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { type VerificationFlow } from "@ory/client-fetch";
import { Verification } from "@ory/elements-react/theme";
import { oryClient, oryConfig } from "../ory";

export function VerificationPage() {
  const [params] = useSearchParams();
  const flowId = params.get("flow");
  const [flow, setFlow] = useState<VerificationFlow | null>(null);

  useEffect(() => {
    if (!flowId) {
      window.location.replace("/self-service/verification/browser");
      return;
    }
    oryClient
      .getVerificationFlowRaw({ id: flowId })
      .then((res) => res.value())
      .then(setFlow)
      .catch(() => {
        window.location.replace("/self-service/verification/browser");
      });
  }, [flowId]);

  if (!flow) return null;

  return <Verification flow={flow} config={oryConfig} />;
}
