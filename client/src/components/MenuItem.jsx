import PropTypes from "prop-types";
import {fetchMenuItemImage} from "../utils/helpers"

export default function MenuItem({ imageLink, name, category, ingredients, price, userRole }) {
  const image = fetchMenuItemImage(imageLink, category);

  return (
    <div className="item">
      <img src={image} alt={name + " slika"} />
      <div>
        <span>
          <h3>{name}</h3>
          <p>{ingredients.map(ingredient => ingredient.name).join(", ")}</p>
        </span>
        <span>
          <p>{price + " €"}</p>
          <button>{userRole === "user" ? "Dodaj u košaricu!" : "Uredi artikl"}</button>
        </span>
      </div>
    </div>
  );
}

MenuItem.propTypes = {
  imageLink: PropTypes.string,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
  userRole: PropTypes.string,
};
