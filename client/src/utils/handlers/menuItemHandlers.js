import CustomError from "../../../../shared/CustomErrorClass";
import entryService from "../../services/entryService";
import { allFieldsChanged } from "../helpers";
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
      alert("Ova stavka već postoji.");
      return new CustomError(409, "Ovaj proizvod već postoji.");
    }
    alert(error.message);
    return new CustomError(error?.status || error?.response?.status || 500);
  }
}

async function handleMenuItemUpdate(
  e,
  id,
  prevFormData,
  formData,
  setFormData,
  setClickedItemButton,
  setUpdatedMenuItem
) {
  e.preventDefault();

  let response;
  setClickedItemButton(false);

  try {
    if (allFieldsChanged(prevFormData, formData)) {
      response = await entryService.fullyUpdate("menu-items", id, formData);
    } else if (JSON.stringify(prevFormData) !== JSON.stringify(formData)) {
      response = await entryService.partiallyUpdate("menu-items", id, formData);
    } else {
      return;
    }

    setUpdatedMenuItem((prevValue) => !prevValue);
    return response;
  } catch (error) {
    setFormData(prevFormData);
    if (error?.status === 409 || error?.response?.status === 409) {
      alert("Ova stavka već postoji.");
      return new CustomError(409, "Ovaj proizvod već postoji.");
    }
    alert(error.message);
    return new CustomError(error?.status || error?.response?.status || 500);
  }
}

async function fetchMenuItemsByQuery(q, setMenuError) {
  try {
    const response = await entryService.fetchByQuery("menu-items", q);
    if (setMenuError) {
      setMenuError(null);
    }
    return response;
  } catch (error) {
    setMenuError("Došlo je do pogreške.");
    console.error(
      new CustomError(error?.status || error?.response?.status || 500)
    );
  }
}

export {
  fetchMenuItemSelectValues,
  handleMenuItemAdd,
  handleMenuItemUpdate,
  fetchMenuItemsByQuery,
};
