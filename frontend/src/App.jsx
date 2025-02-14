import { Route, Routes } from "react-router";
import LoginPage from "./pages/login/loginPage";
import OverlayLoader from "./utils/components/overlayLoader";
import { useLoading } from "./contexts/loaderContext/loaderHook";
import HomePage from "./pages/homePage/homePage";
import SnackbarComponent from "./utils/components/snackbarComponent";

function App() {
  const { isLoading } = useLoading();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      {isLoading && <OverlayLoader />}
      <SnackbarComponent />
    </>
  );
}

export default App;
