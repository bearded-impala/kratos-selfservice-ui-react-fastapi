import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "./routes/Login";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "*", element: <Navigate to="/login" replace /> },
]);
