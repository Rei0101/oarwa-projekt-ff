import "./MakeAMeal.css";
import useAuthContext from "../../hooks/useAuthContext";
import useBagContext from "../../hooks/useBagContext";
import useFetch from "../../hooks/useFetch";
import useMakeAMealForm from "../../hooks/useMakeAMealCheckboxes";
import { kebabCase } from "../../utils/helpers";
import { fetchCollection } from "../../utils/handlers/handlers";
import { handleMealCreation } from "../../utils/handlers/MakeAMealHandlers";
import FormInput from "../../components/FormInput";
import ErrorText from "../../components/ErrorText";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MakeAMeal() {
  const { user } = useAuthContext();
  const { bagItems, addToBag, removeFromBag } = useBagContext();
  const { fetched } = useFetch([], fetchCollection, ["ingredients"]);
  const { formIngredients, handleChange } = useMakeAMealForm(fetched, bagItems);
  const [totalPrice, setTotalPrice] = useState(0);
  const existingCustom = bagItems.some((i) => i.type === "custom");
  const navigate = useNavigate();
  
  useEffect(() => {
    let newTotal = 0;
    if (formIngredients) {
      for (const value of Object.values(formIngredients)) {
        if (value.checked) {
          newTotal += value.price;
        }
      }
      setTotalPrice(newTotal);
    }
  }, [formIngredients]);

  useEffect(() => {
    let newTotal = 0;
    if (formIngredients) {
      for (const value of Object.values(formIngredients)) {
        if (value.checked) {
          newTotal += value.price;
        }
      }
      setTotalPrice(newTotal);
    }
  }, [formIngredients]);

  return (
    <div className="container">
      <form
        id="make-a-meal"
        onSubmit={(e) =>
          handleMealCreation(
            e,
            formIngredients,
            totalPrice,
            bagItems,
            addToBag,
            removeFromBag,
            user?.role,
            navigate
          )
        }
      >
        <button>
          {!existingCustom ? "Stvori jelo😋" : "Poništi kreaciju"}
        </button>
        <p>Cijena: {totalPrice} €</p>
        <div>
          {fetched ? (
            fetched.map((ingredient) => (
              <FormInput
                key={ingredient._id}
                name={ingredient.name}
                labelAfter
                label={ingredient.name}
                type="checkbox"
                checked={
                  formIngredients
                    ? formIngredients[kebabCase(ingredient?.name)]?.checked
                    : false
                }
                onChange={handleChange}
                disabled={!existingCustom ? false : true}
              />
            ))
          ) : (
            <ErrorText error={error} />
          )}
        </div>
      </form>
    </div>
  );
}

export default MakeAMeal;
