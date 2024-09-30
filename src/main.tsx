import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import store from "./redux/reducers/store.ts";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
   <Provider store={store}>
   <HelmetProvider>
      <CssBaseline />
      <div className="" onContextMenu={(e) => e.preventDefault()}>
        <App />
      </div>
    </HelmetProvider>
   </Provider>
  </StrictMode>
);
