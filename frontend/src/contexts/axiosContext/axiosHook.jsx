import { useContext } from "react";
import { AxiosContext } from "./axiosContext";

export const useAxios = () => {
  return useContext(AxiosContext);
};
