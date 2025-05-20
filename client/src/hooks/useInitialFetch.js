import { useState, useEffect } from "react";

function useInitialFetch(initialState, valueHandler) {
  const [data, setData] = useState(initialState);
  
  useEffect(() => {
    async function fetchValues() {
      const result = await valueHandler();
      
      setData(result.length != 1 ? {result} : result);
    }

    fetchValues();
  }, []);

  return data["result"];
}

export default useInitialFetch;
