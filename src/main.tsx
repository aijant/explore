import ReduxProvider from "@providers/redux-provider/index.tsx";
import ToastProvider from "@providers/toast-provider/index.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";
import "leaflet/dist/leaflet.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider>
        <ToastProvider>
            <App />
        </ToastProvider>
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>
);

