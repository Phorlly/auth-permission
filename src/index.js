import React from "react";
import ReactDOM from "react-dom/client";
import './styles/index.css'
import App from "./routes/app";
import { AppProvider } from "./contexts/context";

ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
    </React.StrictMode>
  );