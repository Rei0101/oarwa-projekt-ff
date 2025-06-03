import CustomError from "../../../shared/CustomErrorClass";
import BagContext from "../context/BagContext";
import { useContext } from "react";

function useBagContext() {
  const context = useContext(BagContext);
  if (!context) {
    throw new CustomError(
      500,
      "useBagContext mora biti korišten unutar BagProvider"
    );
  }
  return context;
}

export default useBagContext;