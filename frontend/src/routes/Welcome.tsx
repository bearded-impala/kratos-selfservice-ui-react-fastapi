import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "@ory/elements-react/client";
import { LogoutLink } from "../components/LogoutLink";

export function WelcomePage() {
  const { session, isLoading, initialized } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialized && !isLoading && !session) {
      navigate("/login", { replace: true });
    }
  }, [initialized, isLoading, session, navigate]);

  if (!initialized || isLoading || !session) return null;

  const label = session.identity?.id ?? "there";

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Welcome, {label}</h1>
      <p>
        <Link to="/settings">Account settings</Link>
      </p>
      <LogoutLink />
    </main>
  );
}
