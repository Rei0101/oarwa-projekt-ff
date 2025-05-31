import "./MakeAMeal.css";
import useFetch from "../../hooks/useFetch";
import { fetchCollection } from "../../utils/handlers/handlers";
import FormInput from "../../components/FormInput"

function MakeAMeal() {
  const {fetched} = useFetch(
    {
      ingredients: [],
    },
    fetchCollection,
    ["ingredients"]
  );
  
  return (
    <div className="container">
      <form id="make-a-meal">
        <button>Stvori jelo😋</button>
        <div>
        <FormInput
            name="a"
            label="a"
            type="checkbox"
            labelAfter
          />
          </div>
      </form>
    </div>
  );
}

export default MakeAMeal;
