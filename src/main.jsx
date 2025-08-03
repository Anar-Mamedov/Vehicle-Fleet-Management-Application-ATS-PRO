import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./utils/i18n.js";
import App from "./App.jsx";
import { AppProvider } from "./AppContext.jsx";
import { SelectProvider } from "./context/selectSlice.jsx";
import { FuelTankProvider } from "./context/fuelTankSlice.jsx";
import { PlakaProvider } from "./context/plakaSlice.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "./styles/index.css";

// Service Worker kaydı
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <AppProvider>
            <SelectProvider>
              <FuelTankProvider>
                <PlakaProvider>
                  <App />
                </PlakaProvider>
              </FuelTankProvider>
            </SelectProvider>
          </AppProvider>
        </BrowserRouter>
      </I18nextProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
