import { useSession } from "@ory/elements-react/client";
import { LogoutLink } from "../components/LogoutLink";

export function WelcomePage() {
  const { session, isLoading, initialized } = useSession();

  if (!initialized || isLoading) return null;

  if (!session) {
    window.location.replace("/login");
    return null;
  }

  const identity = session.identity;
  const label = identity?.id ?? "there";

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Welcome, {label}</h1>
      <p>
        <a href="/settings">Account settings</a>
      </p>
      <LogoutLink />
    </main>
  );
}
