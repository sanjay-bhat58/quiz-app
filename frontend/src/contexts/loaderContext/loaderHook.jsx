import { useContext } from "react";
import { LoadingContext } from "./loaderContext";

export const useLoading = () => {
  return useContext(LoadingContext);
};
