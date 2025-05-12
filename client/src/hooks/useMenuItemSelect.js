import { fetchMenuItemSelectValues } from "../utils/handlers/menuItemHandlers";
import { useState, useEffect } from "react";

function useMenuItemSelect() {
  const [selectValues, setSelectValues] = useState({
    selectCategories: [],
    selectIngredients: [],
  });

  useEffect(() => {
    async function fetchSelectValues() {
      const { selectCategories, selectIngredients } =
        await fetchMenuItemSelectValues();

      setSelectValues({
        selectCategories,
        selectIngredients,
      });
    }
    fetchSelectValues();
  }, []);

  return selectValues;
}

export default useMenuItemSelect;
