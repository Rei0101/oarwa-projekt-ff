import "./MakeAMeal.css";
import useFetch from "../../hooks/useFetch";
import useMakeAMealForm from "../../hooks/useMakeAMealCheckboxes";
import { fetchCollection } from "../../utils/handlers/handlers";
import FormInput from "../../components/FormInput";
import ErrorText from "../../components/ErrorText";

function MakeAMeal() {
  const { fetched } = useFetch([], fetchCollection, ["ingredients"]);
  const { checkedIngredients, handleChange } = useMakeAMealForm(fetched);

  return (
    <div className="container">
      <form id="make-a-meal">
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
                checked={checkedIngredients[ingredient.name] || false}
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
