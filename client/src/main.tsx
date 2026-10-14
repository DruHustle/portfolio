import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// All portfolio routes use local content; the optional API client remains in lib/trpc.ts.
createRoot(document.getElementById("root")!).render(<App />);
