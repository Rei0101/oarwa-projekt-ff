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
import { useNavigate } from "react-router-dom";

function MakeAMeal() {
  const { user } = useAuthContext();
  const { bagItems, addToBag, removeFromBag } = useBagContext();
  const { fetched } = useFetch([], fetchCollection, ["ingredients"]);
  const { formIngredients, handleChange } = useMakeAMealForm(fetched);
  const navigate = useNavigate();

  return (
    <div className="container">
      <form
        id="make-a-meal"
        onSubmit={(e) => handleMealCreation(e, formIngredients, user?.role, navigate, addToBag, removeFromBag)}
      >
        <button>Stvori jelo😋</button>
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
                  formIngredients[kebabCase(ingredient.name)]?.checked || false
                }
                onChange={handleChange}
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
