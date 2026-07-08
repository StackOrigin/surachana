import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { SCHOOL } from "./data/schoolData";

document.title = `${SCHOOL.name} — ${SCHOOL.tagline}`;
document.querySelector('meta[name="description"]')?.setAttribute('content', SCHOOL.seoDescription);
const root = document.documentElement;
root.style.setProperty('--color-navy-950', SCHOOL.theme.navy950);
root.style.setProperty('--color-navy-900', SCHOOL.theme.navy900);
root.style.setProperty('--color-gold-400', SCHOOL.theme.gold400);
root.style.setProperty('--color-gold-700', SCHOOL.theme.gold700);
root.style.setProperty('--color-cream-50', SCHOOL.theme.cream50);
root.style.setProperty('--color-cream-100', SCHOOL.theme.cream100);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
