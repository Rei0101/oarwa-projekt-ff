import PropTypes from "prop-types";
import {
  deepCopy,
  fetchImageByCategory,
  descSortAttribute,
} from "../utils/helpers";
import MenuItemForm from "./MenuItemForm";
import useAuthContext from "../hooks/useAuthContext";
import useBagContext from "../hooks/useBagContext";
import useFetch from "../hooks/useFetch";
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

  const bagTemplate = {
    id: itemId,
    imageLink: imageLink || "",
    name,
    categories,
    ingredients,
    price,
    type: "menu",
  };
  const hookInitialStateTemplate = {
    imageLink: imageLink || "",
    name,
    categories: initialCategories,
    ingredients: initialIngredients,
    price,
  };

  const { user } = useAuthContext();
  const { bagItems, addToBag, removeFromBag } = useBagContext();

  const image = fetchImageByCategory(
    imageLink,
    descSortAttribute(categories, "name")
  );
  const [clickedItemButton, setClickedItemButton] = useState(false);
  const navigate = useNavigate();
  const fetchedSelect = useFetch(
    {
      selectCategories: [],
      selectIngredients: [],
    },
    fetchMenuItemSelectValues
  ).fetched;
  const { formData, setFormData, handleChange, disabledSubmit } =
    useMenuItemForm(hookInitialStateTemplate);
  const [prevFormData, setPrevFormData] = useState(hookInitialStateTemplate);
  const buttonText =
    JSON.stringify(prevFormData) === JSON.stringify(formData)
      ? "Odustani"
      : "Ažuriraj artikl";

  useEffect(() => {
    if (bagItems.length > 0 && bagItems.find((i) => i.id === itemId)) {
      setClickedItemButton(true);
    } else {
      setClickedItemButton(false);
    }
  }, [bagItems]);

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
          {user?.role === "admin" ? (
            <button
              onClick={() => setClickedItemButton((prevValue) => !prevValue)}
            >
              Uredi artikl
            </button>
          ) : (
            <button
              onClick={() => {
                addToBag(bagTemplate);
                setClickedItemButton((prevValue) => !prevValue);
              }}
            >
              Dodaj u vrećicu
            </button>
          )}
        </span>
      </div>
    </div>
  ) : user?.role === "admin" ? (
    <div className="item update">
      <MenuItemForm
        onSubmit={(e) => {
          handleMenuItemUpdate(
            e,
            itemId,
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
        selectCategories={fetchedSelect.selectCategories}
        selectIngredients={fetchedSelect.selectIngredients}
        buttonText={buttonText}
        dataKey={itemId}
      />
      <button
        onClick={(e) =>
          deleteEntry("menu-items", itemId, collectionData, setCollectionData)
        }
      >
        Izbriši artikl
      </button>
    </div>
  ) : (
    <div className="item bought">
      <h3>{name}</h3>
      <p>Cijena: {price} €</p>
      <h4>
        Količina u vrećici:{" "}
        {bagItems.find((i) => i.id === itemId)?.quantity || 0}
      </h4>
      <div>
        <button
          onClick={() => {
            if (bagItems.find((i) => i.id === itemId)?.quantity > 1) {
              removeFromBag(itemId);
            } else {
              removeFromBag(itemId);
              setClickedItemButton(false);
            }
          }}
        >
          -
        </button>
        <button onClick={() => addToBag(bagTemplate)}>+</button>
      </div>
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
