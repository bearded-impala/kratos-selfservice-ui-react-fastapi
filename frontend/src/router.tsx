import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "./routes/Login";
import { RegistrationPage } from "./routes/Registration";
import { RecoveryPage } from "./routes/Recovery";
import { VerificationPage } from "./routes/Verification";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/registration", element: <RegistrationPage /> },
  { path: "/recovery", element: <RecoveryPage /> },
  { path: "/verification", element: <VerificationPage /> },
  { path: "*", element: <Navigate to="/login" replace /> },
]);
