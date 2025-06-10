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

function MakeAMeal() {
  const { user } = useAuthContext();
  const { bagItems, addToBag, removeFromBag } = useBagContext();
  const { fetched } = useFetch([], fetchCollection, ["ingredients"]);
  const { checkedIngredients, handleChange } = useMakeAMealForm(fetched);

  return (
    <div className="container">
      <form
        id="make-a-meal"
        onSubmit={(e) => handleMealCreation(e, checkedIngredients, user?.role)}
      >
        <button
          onClick={() => {
            if (bagItems.find((i) => i.id === itemId)?.type === "custom") {
              return 
            }
            else {
              addToBag({
                name: "Kreirano jelo",
                ingredients: checkedIngredients,
                price: 1,
                type: "custom",
              });
            }
          }}
        >
          Stvori jelo😋
        </button>
        <div>
          {fetched ? (
            fetched.map((ingredient) => {
              
              return (
              <FormInput
                key={ingredient._id}
                name={ingredient.name}
                labelAfter
                label={ingredient.name}
                type="checkbox"
                checked={checkedIngredients[kebabCase(ingredient.name)] || false}
                onChange={handleChange}
              />
            )})
          ) : (
            <ErrorText error={error} />
          )}
        </div>
      </form>
    </div>
  );
}

export default MakeAMeal;
