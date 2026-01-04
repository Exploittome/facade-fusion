import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Force dark theme since the theme toggle is currently removed.
// This prevents light-theme artifacts like a "white stripe" on the header during scroll.
(() => {
  const root = document.documentElement;
  root.classList.add("dark");
  try {
    localStorage.setItem("theme", "dark");
  } catch {
    // ignore
  }
})();

createRoot(document.getElementById("root")!).render(<App />);
