import { fetchCollection } from "../utils/handlers/handlers";
import { useState, useEffect } from "react";

function useMenuItems(filter, clickedAdd) {
  const [collectionData, setCollectionData] = useState([]);
  const [menuError, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const menuItemsData = await fetchCollection("menu-items", setError);
      setCollectionData(menuItemsData);
    }

    fetchData();
  }, [filter, clickedAdd]);

  return { collectionData, menuError };
}

export default useMenuItems;
