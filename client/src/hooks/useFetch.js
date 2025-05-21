import CustomError from "../../../shared/CustomErrorClass";
import { useState, useEffect } from "react";

//TODO Combine with useMenuItems.jsx too
function useFetch(initialState, valueHandler, handlerParams, dependencies = []) {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchValues() {
      try {
        const result = await valueHandler(...(handlerParams ?? []), setError);

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
    if (handlerParams === undefined || handlerParams.length > 0) {
      fetchValues();
      
    }
  }, [...dependencies]);
  
  return { ...(data?.result ?? data), error };
}

export default useFetch;
