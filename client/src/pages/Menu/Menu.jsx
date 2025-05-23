import "./Menu.css";
import MenuItemForm from "../../components/MenuItemForm";
import MenuItem from "../../components/MenuItem";
import useMenuItems from "../../hooks/useMenuItems";
import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import useMenuItemForm from "../../hooks/useMenuItemForm";
import useInitialFetch from "../../hooks/useInitialFetch";
import {
  fetchMenuItemSelectValues,
  handleMenuItemAdd,
} from "../../utils/handlers/menuItemHandlers";

function Menu() {
  const { user } = useAuthContext();
  const [filter, setFilter] = useState("");
  const [clickedAdd, setClickedAdd] = useState(false);
  const [updatedMenuItem, setUpdatedMenuItem] = useState(false);
  const selectValues = useInitialFetch(
    {
      selectCategories: [],
      selectIngredients: [],
    },
    fetchMenuItemSelectValues
  );
  
  const { collectionData, setCollectionData, menuError } = useMenuItems(
    filter,
    clickedAdd,
    updatedMenuItem
  );
  const { formData, setFormData, handleChange, disabledSubmit } =
    useMenuItemForm({
      imageLink: "",
      name: "",
      categories: [],
      ingredients: [],
      price: 0.01,
    });

  return (
    <div className="container">
      <input
        placeholder="Filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        type="text"
      />
      {!menuError ? (
        <div id="menu">
          {collectionData.map((item) => {
            return (
              <MenuItem
                key={item._id}
                itemId={item._id}
                imageLink={item.imageLink || null}
                name={item.name}
                categories={[...item.categories]}
                ingredients={[...item.ingredients]}
                price={item.price}
                collectionData={collectionData}
                setCollectionData={setCollectionData}
                setUpdatedMenuItem={setUpdatedMenuItem}
              />
            );
          })}
          {user?.role === "admin" ? (
            <div
              className="item add"
              onClick={() => setClickedAdd(true)}
              style={{ cursor: `${!clickedAdd ? "pointer" : "default"}` }}
            >
              {!clickedAdd ? (
                <>
                  <h1>+</h1>
                  <h2>Dodaj artikl</h2>
                </>
              ) : (
                <>
                  <MenuItemForm
                    onSubmit={(e) =>
                      handleMenuItemAdd(e, formData, setFormData, setClickedAdd)
                    }
                    formData={formData}
                    handleChange={handleChange}
                    disabledSubmit={disabledSubmit}
                    selectCategories={selectValues?.selectCategories}
                    selectIngredients={selectValues?.selectIngredients}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setClickedAdd(false);
                    }}
                  >
                    Poništi
                  </button>
                </>
              )}
            </div>
          ) : null}
        </div>
      ) : (
        <h3>{menuError}</h3>
      )}
    </div>
  );
}

export default Menu;
