import { useContext } from "react";
import { AxiosContext } from "./axiosContext";
import { AuthContext } from "../authContext/authContext";
import { createAxiosInstance } from "../../utils/functions/axiosInstance";
import PropTypes from "prop-types";

export const AxiosProvider = ({ children }) => {
  const { setUserRole, setUserName } = useContext(AuthContext);
  const instance = createAxiosInstance(setUserRole, setUserName);

  return (
    <AxiosContext.Provider value={{ axiosInstance: instance }}>
      {children}
    </AxiosContext.Provider>
  );
};

AxiosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
