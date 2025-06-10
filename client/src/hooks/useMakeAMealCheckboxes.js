import { kebabCase } from "../utils/helpers";
import { useState, useEffect } from "react";

function useMakeAMealCheckboxes(fetched) {
  const [formIngredients, setFormIngredients] = useState({});

  useEffect(() => {
    
    
    if (fetched) {
      const initialState = {};
      fetched.forEach((item) => {
        initialState[kebabCase(item.name)] = {
          checked: false,
          price: item.price
        };
      });
      setFormIngredients(initialState);
      
    console.log(formIngredients);
    }
  }, [fetched]);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    
    setFormIngredients((prev) => {
      return ({
      ...prev,
      [name]: {
        checked,
        price: prev[name].price
      },
    })});

    console.log(formIngredients);
    
  };
  
  return { formIngredients, handleChange };
}

export default useMakeAMealCheckboxes;
