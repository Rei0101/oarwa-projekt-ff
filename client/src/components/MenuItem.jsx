import PropTypes from "prop-types";
import { deepCopy, fetchMenuItemImage } from "../utils/helpers";
import MenuItemForm from "./MenuItemForm";
import useAuthContext from "../hooks/useAuthContext";
import useInitialFetch from "../hooks/useInitialFetch";
import useMenuItemForm from "../hooks/useMenuItemForm";
import { deleteEntry } from "../utils/handlers/handlers";
import {
  fetchMenuItemSelectValues,
  handleMenuItemUpdate,
} from "../utils/handlers/menuItemHandlers";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MenuItem({
  itemId,
  imageLink,
  name,
  categories,
  ingredients,
  price,
  collectionData,
  setCollectionData,
  setUpdatedMenuItem,
}) {
  const initialCategories = categories.map((category) => category._id);
  const initialIngredients = ingredients.map((ingredient) => ingredient._id);
  const { user } = useAuthContext();
  const image = fetchMenuItemImage(
    imageLink,
    categories.sort((a, b) => b.type.localeCompare(a.type))[0]?.name
  );
  const [clickedItemButton, setClickedItemButton] = useState(false);
  const navigate = useNavigate();
  const selectValues = useInitialFetch(
    {
      selectCategories: [],
      selectIngredients: [],
    },
    fetchMenuItemSelectValues
  );
  const { formData, setFormData, handleChange, disabledSubmit } =
    useMenuItemForm({
      imageLink: imageLink || "",
      name,
      categories: initialCategories,
      ingredients: initialIngredients,
      price,
    });
  const [prevFormData, setPrevFormData] = useState({
    imageLink: imageLink || "",
    name,
    categories: initialCategories,
    ingredients: initialIngredients,
    price,
  });
  const buttonText =
    JSON.stringify(prevFormData) === JSON.stringify(formData)
      ? "Poništi"
      : "Ažuriraj artikl";

  useEffect(() => {
    if (clickedItemButton && user?.role !== "user" && user?.role !== "admin") {
      navigate("/login");
    }
  }, [clickedItemButton, user?.role, navigate]);

  useEffect(() => {
    if (clickedItemButton) {
      setPrevFormData(deepCopy(formData));
    }
  }, [clickedItemButton]);

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
            {user?.role === "admin" ? "Uredi artikl" : "Dodaj u vrećicu"}
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
    <div className="item update" data-key={itemId}>
      <MenuItemForm
        onSubmit={(e) => {
          handleMenuItemUpdate(
            e,
            e.target[5].dataset.key.toString(),
            prevFormData,
            formData,
            setFormData,
            setClickedItemButton,
            setUpdatedMenuItem
          );
        }}
        formData={formData}
        handleChange={handleChange}
        disabledSubmit={disabledSubmit}
        selectCategories={selectValues?.selectCategories}
        selectIngredients={selectValues?.selectIngredients}
        buttonText={buttonText}
        dataKey={itemId}
      />
      <button
        data-key={itemId}
        onClick={(e) =>
          deleteEntry(
            "menu-items",
            e.target.dataset.key,
            collectionData,
            setCollectionData
          )
        }
      >
        Izbriši artikl
      </button>
    </div>
  );
}

MenuItem.propTypes = {
  itemId: PropTypes.string.isRequired,
  imageLink: PropTypes.string,
  name: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  ingredients: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
  collectionData: PropTypes.array.isRequired,
  setCollectionData: PropTypes.func.isRequired,
  setUpdatedMenuItem: PropTypes.func,
};
