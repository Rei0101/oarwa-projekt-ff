import { kebabCase } from "../utils/helpers";
import { useState, useEffect } from "react";

function useMakeAMealCheckboxes(fetched) {
  const [checkedIngredients, setCheckedIngredients] = useState({});

  useEffect(() => {
    if (fetched) {
      const initialState = {};
      fetched.forEach((item) => {
        initialState[kebabCase(item.name)] = false;
      });
      setCheckedIngredients(initialState);
    }
  }, [fetched]);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    console.log(event.target.name, event.target.checked);
    
    setCheckedIngredients((prev) => {
      return ({
      ...prev,
      [name]: checked,
    })});
  };
  
  return { checkedIngredients, handleChange };
}

export default useMakeAMealCheckboxes;
