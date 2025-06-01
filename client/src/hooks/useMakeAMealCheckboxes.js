import { useState, useEffect } from "react";

function useMakeAMealCheckboxes(fetched) {
  const [checkedIngredients, setCheckedIngredients] = useState({});

  useEffect(() => {
    if (fetched) {
      const initialState = {};
      fetched.forEach((item) => {
        initialState[item.name.split(" ").join("-")] = false;
      });
      setCheckedIngredients(initialState);
    }
  }, [fetched]);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCheckedIngredients((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return { checkedIngredients, handleChange };
}

export default useMakeAMealCheckboxes;
