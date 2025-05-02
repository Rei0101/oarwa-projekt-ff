import PropTypes from "prop-types";
import { fetchMenuItemImage } from "../utils/helpers";
import FormInput from "./FormInput";
import FormSelect from "./FormInput";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MenuItem({
  imageLink,
  name,
  category,
  ingredients,
  price,
}) {
  const { user } = useAuth();
  const image = fetchMenuItemImage(imageLink, category);
  const [clickedItemButton, setClickedItemButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (clickedItemButton && user?.role !== "user" && user?.role !== "admin") {
      navigate("/login");
    }
  }, [clickedItemButton, user?.role, navigate]);

  return !clickedItemButton ? (
    <div className="item">
      <img src={image} alt={name + " slika"} />
      <div>
        <span>
          <h3>{name}</h3>
          <p>{ingredients.map((ingredient) => ingredient.name).join(", ")}</p>
        </span>
        <span>
          <p>{price + " €"}</p>
          <button
            onClick={() => setClickedItemButton((prevValue) => !prevValue)}
          >
            {user?.role === "user" ? "Dodaj u vrećicu" : "Uredi artikl"}
          </button>
        </span>
      </div>
    </div>
  ) : user?.role === "user" ? (
    <div className="item clicked">
      <h2>Dodano u vrećicu!</h2>
      <button onClick={() => setClickedItemButton(false)}>Poništi</button>
    </div>
  ) : (
    <div className="item clicked">
      <form>
        <p className="optional">* (opcionalno)</p>
        <FormInput
          name="imageLink"
          label="* Slika"
          placeholder="https://link-na-sliku.mym"
          value={""}
          /* onChange={} */
        />
        <FormInput
          name="name"
          label="Naziv"
          value={""}
          /* onChange={} */
          required
        />
        <FormSelect
          name="categories"
          label="Kategorije"
          value={""}
          /* onChange={} */
          //options={categories}
          required
        />
        <FormSelect
          name="ingredients"
          label="Sastojci"
          value={""}
          /* onChange={} */
          options={ingredients}
          required
        />
        <FormInput
          name="price"
          label="Cijena (€)"
          type="number"
          value={""}
          /* onChange={} */
          min="0.01"
          step="0.01"
          required
        />
        <button>Potvrdi</button>
      </form>
      <button onClick={() => setClickedItemButton(false)}>Poništi</button>
    </div>
  );
}

MenuItem.propTypes = {
  imageLink: PropTypes.string,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
};
