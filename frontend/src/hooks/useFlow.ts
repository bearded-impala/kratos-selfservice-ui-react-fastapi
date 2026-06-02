import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


export function useFlow<T>(
  flowType: string,
  fetchFlow: (id: string) => Promise<T>,
): T | null {
  const [params] = useSearchParams();
  const [flow, setFlow] = useState<T | null>(null);
  const flowId = params.get("flow");

  useEffect(() => {
    if (!flowId) {
      window.location.replace(`/self-service/${flowType}/browser`);
      return;
    }

    fetchFlow(flowId)
      .then(setFlow)
      .catch(() => {
        window.location.replace(`/self-service/${flowType}/browser`);
      });
  }, [flowId, flowType]);

  return flow;
}
