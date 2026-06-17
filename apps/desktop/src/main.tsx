import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { applyThemePreference } from "./lib/theme";
import "@signal/brand/tokens.css";
import "./styles/fonts.css";
import "./styles/legacy-shim.css";
import "./styles/app.css";
import "./styles/activity.css";

applyThemePreference("dark");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
