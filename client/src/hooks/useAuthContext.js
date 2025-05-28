import CustomError from "../../../shared/CustomErrorClass";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new CustomError(
      500,
      "useAuthContext mora biti korišten unutar AuthProvider"
    );
  }
  return context;
}

export default useAuthContext;
