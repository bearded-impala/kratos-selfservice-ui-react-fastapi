import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { type FlowError } from "@ory/client-fetch";
import { Error as ErrorPage } from "@ory/elements-react/theme";
import { oryClient, oryConfig } from "../ory";

export function ErrorRoute() {
  const [params] = useSearchParams();
  const errorId = params.get("id");
  const [error, setError] = useState<FlowError | null>(null);

  useEffect(() => {
    if (!errorId) return;
    oryClient
      .getFlowErrorRaw({ id: errorId })
      .then((res) => res.value())
      .then(setError)
      .catch(() => setError(null));
  }, [errorId]);

  if (!error) return null;

  return <ErrorPage error={error} config={oryConfig} />;
}
