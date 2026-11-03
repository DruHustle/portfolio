import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// All portfolio routes use local content.
createRoot(document.getElementById("root")!).render(<App />);
