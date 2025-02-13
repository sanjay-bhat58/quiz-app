import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { LoadingProvider } from "./contexts/loaderContext/loaderProvider.jsx";

createRoot(document.getElementById("root")).render(
  <LoadingProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LoadingProvider>
);
