import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/base.css";
import { loadSiteData, applySchoolMeta } from "./data/schoolData";
import { LangProvider } from "./i18n/lang";

// Apply meta from static data immediately, then hydrate with backend data
// in the background. This is non-blocking — the app renders instantly with
// bundled static data and re-renders when backend data arrives.
applySchoolMeta();
loadSiteData();

async function start() {
  const { default: App } = await import("./App");
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <LangProvider>
        <App />
      </LangProvider>
    </StrictMode>
  );
}

start();