import PropTypes from "prop-types";

export default function MenuItem({ imageLink, name, ingredients, price, userRole }) {
  return (
    <div className="item">
      <img src={imageLink} alt={name + " slika"} />
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
  imageLink: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
  userRole: PropTypes.string,
};
