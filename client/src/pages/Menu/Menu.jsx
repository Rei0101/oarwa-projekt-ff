import "./Menu.css";
import MenuItem from "../../components/MenuItem";
import useMenuItems from "../../hooks/useMenuItems";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import { fetchUserRole } from "../../utils/helpers";
import { useState } from "react";
import useMenuItemAddForm from "../../hooks/useMenuItemAddForm";
import { handleMenuItemAdd } from "../../utils/handlers";

function Menu() {
  const userRole = fetchUserRole();
  const [filter, setFilter] = useState("");
  const [clickedAdd, setClickedAdd] = useState(false);
  const { collectionData, menuError } = useMenuItems(filter);
  const { formData, handleChange, disabledSubmit } = useMenuItemAddForm({
    imageLink: "",
    name: "",
    categories: [],
    ingredients: [],
    price: "0.01",
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
                imageLink={item.imageLink || null}
                name={item.name}
                category={
                  item.categories.sort((a, b) =>
                    b.type.localeCompare(a.type)
                  )[0]?.name
                }
                ingredients={[...item.ingredients]}
                price={item.price}
                userRole={userRole}
              />
            );
          })}
          {userRole === "admin" ? (
            <div
              className="item add"
              onClick={() => setClickedAdd(true)}
              style={{ cursor: `${!clickedAdd ? "pointer" : "default"}` }}
            >
              {!clickedAdd ? (
                <span>
                  <h1>+</h1>
                  <h2>Dodaj artikl</h2>
                </span>
              ) : (
                <span>
                  <form onSubmit={(e) => handleMenuItemAdd(e)}>
                    <FormInput
                      name="imageLink"
                      label="Slika"
                      placeholder="http://slika.mym"
                      value={formData.imageLink}
                      onChange={handleChange}
                    />
                    <FormInput
                      name="name"
                      label="Naziv"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <FormSelect
                      name="categories"
                      label="Kategorije"
                      value={formData.categories}
                      onChange={handleChange}
                      options={["burger", "pizza", "a", "b", "c", "d", "e"]}
                      required
                    />
                    <FormSelect
                      name="ingredients"
                      label="Sastojci"
                      value={formData.ingredients}
                      onChange={handleChange}
                      options={["ketchup", "krastavci"]}
                      required
                    />
                    <FormInput
                      name="price"
                      label="Cijena (€)"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      min="0.01"
                      step="0.01"
                      required
                    />
                    <button disabled={disabledSubmit}>Potvrdi</button>
                  </form>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setClickedAdd(false);
                    }}
                  >
                    Poništi
                  </button>
                </span>
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
