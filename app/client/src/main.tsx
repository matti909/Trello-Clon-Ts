import {} from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { AppStateProvider } from "./context/AppStateContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </>
);
