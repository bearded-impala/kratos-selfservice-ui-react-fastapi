import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { SessionProvider } from "@ory/elements-react/client";
import "@ory/elements-react/theme/styles.css";
import { router } from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionProvider baseUrl="">
      <RouterProvider router={router} />
    </SessionProvider>
  </StrictMode>,
);
