import CustomError from "../../../../shared/CustomErrorClass";
import entryService from "../../services/entryService";
import { fetchCollection } from "./handlers";

async function fetchMenuItemSelectValues() {
  try {
    const [selectCategories, selectIngredients] = await Promise.all([
      fetchCollection("categories"),
      fetchCollection("ingredients"),
    ]);
    return { selectCategories, selectIngredients };
  } catch (error) {
    return console.error(
      new CustomError(error?.status || error?.response?.status || 500)
    );
  }
}

async function handleMenuItemAdd(e, formData, setFormData, setClickedAdd) {
  e.preventDefault();

  try {
    const response = await entryService.add("menu-items", formData);

    setFormData({
      imageLink: "",
      name: "",
      categories: [],
      ingredients: [],
      price: "0.01",
    });
    setClickedAdd(false);

    return response;
  } catch (error) {
    if (error?.status === 409 || error?.response?.status === 409) {
      alert("Ova stavka već postoji." || error.message);
      return new CustomError(409, "Ovaj proizvod već postoji.");
    }
    alert(error.message);
    return new CustomError(error?.status || error?.response?.status || 500);
  }
}

export { fetchMenuItemSelectValues, handleMenuItemAdd };
