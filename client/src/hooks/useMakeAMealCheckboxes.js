import { kebabCase } from "../utils/helpers";
import { useState, useEffect } from "react";

function useMakeAMealCheckboxes(fetched, bagItems) {
  const [formIngredients, setFormIngredients] = useState({});
  const customMealIngredients = bagItems.filter((i) => i.type === "custom")[0]
    ?.ingredients || [];

  useEffect(() => {
    if (fetched) {
      const initialState = {};
      
      fetched.forEach((item) => {
        const ingredientName = formIngredients[kebabCase(item.name)]?.name;
        
        initialState[kebabCase(item.name)] = {
          name: kebabCase(item.name),
          checked: bagItems.length > 0
            ? customMealIngredients.includes(ingredientName)
              ? true
              : formIngredients[kebabCase(item.name)]?.checked || false
            : formIngredients[kebabCase(item.name)]?.checked || false,
          price: item?.price,
        };
      });

      setFormIngredients(initialState);
    }
  }, [fetched]);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    
    setFormIngredients((prev) => {
      return {
        ...prev,
        [name]: {
          name,
          checked,
          price: prev[name]?.price,
        },
      };
    });
  };

  return { formIngredients, handleChange };
}

export default useMakeAMealCheckboxes;
