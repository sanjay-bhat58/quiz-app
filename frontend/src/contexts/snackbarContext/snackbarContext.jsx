import { createContext } from "react";

export const SnackbarContext = createContext({
  snackbarOpen: false,
  snackbarMessage: "",
  snackbarSeverity: "success",
  handleSnackbarOpen: () => {},
  handleSnackbarClose: () => {},
});
