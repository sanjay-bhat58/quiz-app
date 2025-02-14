import { Snackbar, Alert } from "@mui/material";
import { useSnackbar } from "../../contexts/snackbarContext/snackbarHook";

const SnackbarComponent = () => {
  const {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    handleSnackbarClose,
  } = useSnackbar();

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={5000}
      onClose={handleSnackbarClose}
    >
      <Alert severity={snackbarSeverity} onClose={handleSnackbarClose}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
