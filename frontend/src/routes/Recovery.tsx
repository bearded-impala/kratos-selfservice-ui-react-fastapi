import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { type RecoveryFlow } from "@ory/client-fetch";
import { Recovery } from "@ory/elements-react/theme";
import { oryClient, oryConfig } from "../ory";

export function RecoveryPage() {
  const [params] = useSearchParams();
  const flowId = params.get("flow");
  const [flow, setFlow] = useState<RecoveryFlow | null>(null);

  useEffect(() => {
    if (!flowId) {
      window.location.replace("/self-service/recovery/browser");
      return;
    }
    oryClient
      .getRecoveryFlowRaw({ id: flowId })
      .then((res) => res.value())
      .then(setFlow)
      .catch(() => {
        window.location.replace("/self-service/recovery/browser");
      });
  }, [flowId]);

  if (!flow) return null;

  return <Recovery flow={flow} config={oryConfig} />;
}
