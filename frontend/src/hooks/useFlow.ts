import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FlowType, handleFlowError } from "@ory/client-fetch";

function initFlow(
  flowType: FlowType,
  params: URLSearchParams,
  useFlowId?: string,
): void {
  const next = new URLSearchParams(params);
  next.delete("flow");
  if (useFlowId) next.set("flow", useFlowId);
  const qs = next.toString();
  window.location.replace(
    `/self-service/${flowType}/browser${qs ? `?${qs}` : ""}`,
  );
}

export function useFlow<T>(
  flowType: FlowType,
  fetchFlow: (id: string) => Promise<T>,
): T | null {
  const [params] = useSearchParams();
  const [flow, setFlow] = useState<T | null>(null);
  const flowId = params.get("flow");

  useEffect(() => {
    if (!flowId) {
      initFlow(flowType, params);
      return;
    }

    fetchFlow(flowId)
      .then(setFlow)
      .catch(
        handleFlowError<T>({
          onRestartFlow: (useFlowId) => initFlow(flowType, params, useFlowId),
          onValidationError: (body) => setFlow(body),
          onRedirect: (url, external) => {
            if (external) window.location.assign(url);
            else window.location.replace(url);
          },
        }),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flowId, flowType]);

  return flow;
}
