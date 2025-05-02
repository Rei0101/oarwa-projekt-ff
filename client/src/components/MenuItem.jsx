import PropTypes from "prop-types";
import { fetchMenuItemImage } from "../utils/helpers";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MenuItem({
  imageLink,
  name,
  category,
  ingredients,
  price,
  userRole,
}) {
  
  const image = fetchMenuItemImage(imageLink, category);
  const [clickedItemButton, setClickedItemButton] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (clickedItemButton && userRole !== "user" && userRole !== "admin") {
      navigate("/login");
    }
  }, [clickedItemButton, userRole, navigate]);

  return (
      !clickedItemButton ? (
        <div className="item">
          <img src={image} alt={name + " slika"} />
          <div>
            <span>
              <h3>{name}</h3>
              <p>{ingredients.map((ingredient) => ingredient.name).join(", ")}</p>
            </span>
            <span>
              <p>{price + " €"}</p>
              <button onClick={() => setClickedItemButton(prevValue => !prevValue)}>
                {userRole === "user" ? "Dodaj u narudžbu" : "Uredi artikl"}
              </button>
            </span>
          </div>
        </div>
      ) : userRole === "user" ? (
        <div className="item">
          <h1>Dodano u narudžbu!</h1>
        </div>
      ) : (
        <div className="item">
          <h1>admin</h1>
        </div>
      )
      
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
