import CustomError from "../../../shared/CustomErrorClass";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";

function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new CustomError(
      500,
      "useThemeContext mora biti korišten unutar ThemeProvider"
    );
  }
  return context;
}

export default useThemeContext;
