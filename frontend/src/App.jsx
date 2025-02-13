import { Route, Routes } from "react-router";
import LoginPage from "./pages/login/loginPage";
import OverlayLoader from "./utils/components/overlayLoader";
import { useLoading } from "./contexts/loaderContext/loaderHook";

function App() {
  const { isLoading } = useLoading();
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      {isLoading && <OverlayLoader />}
    </>
  );
}

export default App;
