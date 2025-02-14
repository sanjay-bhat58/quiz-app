import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./authContext";
import { decodeJWT } from "../../utils/functions/decodeJwt";

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = decodeJWT(token);
        setUserRole(decodedToken.userRole);
        setUserName(decodedToken.userName);
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        setUserRole(null);
        setUserName(null);
      }
    } else {
      setUserRole(null);
      setUserName(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ userRole, userName, setUserRole, setUserName }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
