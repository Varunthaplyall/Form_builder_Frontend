import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
