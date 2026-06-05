import { useEffect, useState } from "react";
import { oryClient } from "../ory";

export function LogoutLink() {
  const [logoutUrl, setLogoutUrl] = useState<string | null>(null);

  useEffect(() => {
    oryClient
      .createBrowserLogoutFlow()
      .then((flow) => setLogoutUrl(flow.logout_url))
      .catch(() => setLogoutUrl(null));
  }, []);

  if (!logoutUrl) return null;

  return <a href={logoutUrl}>Log out</a>;
}
