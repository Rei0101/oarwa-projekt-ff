import CustomError from "../../../shared/CustomErrorClass";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new CustomError(500, "useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;