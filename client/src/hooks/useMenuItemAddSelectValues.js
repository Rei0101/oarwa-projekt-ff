import { fetchMenuItemAddSelectValues } from "../utils/handlers/handlers";
import { useState, useEffect } from "react";

function useMenuItemAddSelectValues() {
  const [selectValues, setSelectValues] = useState({
    categories: [],
    ingredients: [],
  });

  useEffect(() => {
    async function fetchSelectValues() {
      const { categories, ingredients } = await fetchMenuItemAddSelectValues();

      setSelectValues({
        categories,
        ingredients,
      });
    }
    fetchSelectValues();
  }, []);

  return selectValues;
}

export default useMenuItemAddSelectValues;
