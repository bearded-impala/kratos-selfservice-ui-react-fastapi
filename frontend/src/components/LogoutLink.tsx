import { useEffect, useState } from "react";
import type { LogoutFlow } from "@ory/client-fetch";
import { withBase } from "../basePath";

export function LogoutLink() {
  const [logoutUrl, setLogoutUrl] = useState<string | null>(null);

  useEffect(() => {
    void fetch(withBase("/self-service/logout/browser"), {
      headers: { Accept: "application/json" },
    }).then(async (res) => {
      if (res.status === 200) {
        const flow = (await res.json()) as LogoutFlow;
        setLogoutUrl(flow.logout_url);
      }
    });
  }, []);

  if (!logoutUrl) return null;

  return <a href={logoutUrl}>Log out</a>;
}
