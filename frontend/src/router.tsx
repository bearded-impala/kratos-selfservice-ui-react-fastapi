import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "./routes/Login";
import { RegistrationPage } from "./routes/Registration";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/registration", element: <RegistrationPage /> },
  { path: "*", element: <Navigate to="/login" replace /> },
]);
