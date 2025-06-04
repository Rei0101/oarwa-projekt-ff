import PropTypes from "prop-types";
import {
  deepCopy,
  fetchMenuItemImage,
  descSortByAttribute,
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

  const { user } = useAuthContext();
  const { bagItems, addToBag, removeFromBag } = useBagContext();

  const image = fetchMenuItemImage(
    imageLink,
    descSortByAttribute(categories, "name")
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
      ? "Odustani"
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
          {user?.role === "user" ? (
            <button
              onClick={() => {
                addToBag({
                  id: itemId,
                  imageLink: imageLink || "",
                  name,
                  ingredients,
                  price,
                });
                setClickedItemButton((prevValue) => !prevValue);
              }}
            >
              Dodaj u vrećicu
            </button>
          ) : (
            <button
              onClick={() => setClickedItemButton((prevValue) => !prevValue)}
            >
              Uredi artikl
            </button>
          )}
        </span>
      </div>
    </div>
  ) : user?.role === "user" ? (
    <div className="item bought">
      <h3>{name}</h3>
      <p>Cijena: {price} €</p>
      <h4>
        Količina u vrećici:{" "}
        {bagItems.find((i) => i.id === itemId)?.quantity || 0}
      </h4>
      <div>
        <button
          onClick={() =>
            addToBag({
              id: itemId,
              imageLink: imageLink || "",
              name,
              ingredients,
              price,
            })
          }
        >
          +
        </button>
        <button
          onClick={() => {
            if (bagItems.find((i) => i.id === itemId)?.quantity !== 1) {
              removeFromBag(itemId);
            } else {
              removeFromBag(itemId);
              setClickedItemButton(false)
            }
          }}
        >
          -
        </button>
      </div>
    </div>
  ) : (
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
