import "@smastrom/react-rating/style.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-photo-view/dist/react-photo-view.css";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/swiper/swiper-bundle.min.css";
import App from "./App.tsx";
import "./i18n";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
