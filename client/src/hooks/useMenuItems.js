import { fetchCollection } from "../utils/handlers/handlers";
import { useState, useEffect } from "react";

function useMenuItems(filter, clickedAdd, updatedMenuItem) {
  const [collectionData, setCollectionData] = useState([]);
  const [menuError, setMenuError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const menuItemsData = await fetchCollection("menu-items", setMenuError);
      setCollectionData(menuItemsData);
    }

    fetchData();
  }, [filter, clickedAdd, updatedMenuItem]);

  return { collectionData, setCollectionData, menuError };
}

export default useMenuItems;
