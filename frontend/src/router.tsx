import { createBrowserRouter, Navigate } from "react-router-dom";
import { basePath } from "./basePath";
import { WelcomePage } from "./routes/Welcome";
import { LoginPage } from "./routes/Login";
import { RegistrationPage } from "./routes/Registration";
import { RecoveryPage } from "./routes/Recovery";
import { VerificationPage } from "./routes/Verification";
import { SettingsPage } from "./routes/Settings";
import { ErrorRoute } from "./routes/Error";

export const router = createBrowserRouter(
  [
    { path: "/", element: <WelcomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/registration", element: <RegistrationPage /> },
    { path: "/recovery", element: <RecoveryPage /> },
    { path: "/verification", element: <VerificationPage /> },
    { path: "/settings", element: <SettingsPage /> },
    { path: "/error", element: <ErrorRoute /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ],
  { basename: basePath || undefined },
);
