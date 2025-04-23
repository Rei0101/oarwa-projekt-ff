import { fetchCollection } from "../utils/handlers";
import { useState, useEffect } from "react";

const useMenuItems = (filter) => {
  const [collectionData, setCollectionData] = useState([]);
  const [error, setError] = useState(null);
  
    
  useEffect(() => {
    async function fetchData() {
      const menuItemsData = await fetchCollection("menu-items", setError);
      
      setCollectionData(menuItemsData);
    }

    fetchData();
  }, [filter]);

  return { collectionData, error };
};

export default useMenuItems;