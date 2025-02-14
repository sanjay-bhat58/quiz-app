import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { LoadingProvider } from "./contexts/loaderContext/loaderProvider.jsx";
import { AuthProvider } from "./contexts/authContext/authProvider.jsx";
import { AxiosProvider } from "./contexts/axiosContext/axiosProvider.jsx";
import { SnackbarProvider } from "./contexts/snackbarContext/snackbarProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AxiosProvider>
      <SnackbarProvider>
        <LoadingProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LoadingProvider>
      </SnackbarProvider>
    </AxiosProvider>
  </AuthProvider>
);
