import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@signal/brand/tokens.css";
import "./styles/legacy-shim.css";
import "./styles/app.css";
import "./styles/activity.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
