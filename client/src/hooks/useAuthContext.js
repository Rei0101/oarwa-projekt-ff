import CustomError from "../../../shared/CustomErrorClass";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new CustomError(500, "useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export default useAuthContext;