import { createRoot } from "react-dom/client";
import "xp.css/dist/XP.css";
import "./index.css";
import App from "./App.tsx";

async function boot() {
    const { worker } = await import("./mocks/browser");
    await worker.start({ onUnhandledRequest: "bypass" });

    createRoot(document.getElementById("root")!).render(<App />);
}

boot();
