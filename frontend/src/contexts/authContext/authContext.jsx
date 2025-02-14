import { createContext } from "react";

export const AuthContext = createContext({
  userRole: null,
  userName: null,
  setUserRole: () => {},
  setUserName: () => {},
});
