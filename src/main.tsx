import { createRoot } from "react-dom/client";
import PiwikPro from "@piwikpro/react-piwik-pro";
import App from "./App.tsx";
import "./index.css";

PiwikPro.initialize(
  "43f6910d-86e0-48c1-be89-0fabb26a9a04",
  "https://rxahm3d.piwiksandbox.com"
);

createRoot(document.getElementById("root")!).render(<App />);
