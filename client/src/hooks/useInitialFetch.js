import CustomError from "../../../shared/CustomErrorClass";
import { useState, useEffect } from "react";

//TODO Combine with useMenuItems.jsx too
function useInitialFetch(initialState, valueHandler, handlerParams) {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    if (handlerParams.some((param) => param === undefined || param === null)) {
      return;
    }
    async function fetchValues() {
      try {
        const result = await valueHandler(...(handlerParams ?? []));

        setData(result.length != 1 ? { result } : result);
      } catch (error) {
        console.error(
          new CustomError(
            error?.status || 500,
            error?.message || "Došlo je do pogreške."
          )
        );
      }
    }

    fetchValues();
  }, []);

  return data["result"];
}

export default useInitialFetch;
