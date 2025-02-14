import PropTypes from "prop-types";
import { SnackbarContext } from "./snackbarContext";
import { useCallback, useState } from "react";

export const SnackbarProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarOpen = useCallback((message, severity) => {
    setSnackbarOpen(true);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  return (
    <SnackbarContext.Provider
      value={{
        handleSnackbarOpen,
        handleSnackbarClose,
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

SnackbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
