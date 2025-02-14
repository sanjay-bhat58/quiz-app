import { useContext } from "react";
import { SnackbarContext } from "./snackbarContext";

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
