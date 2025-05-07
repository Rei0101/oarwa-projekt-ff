import CustomError from "../../../../shared/CustomErrorClass";
import handleError from "./errorHandler";
import entryService from "../../services/entryService";

function handleFocus(getter, setError) {
  return function (e) {
    const { name } = e.target;
    setError(getter[name]);
  };
}

function handleBlur(setter) {
  return function (e) {
    const { name, value } = e.target;
    let valueCopy;

    if (name === "email") {
      valueCopy = value;

      setter((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    setTimeout(() => {
      setter((prev) => ({
        ...prev,
        [name]: name === "email" ? valueCopy : value.trim(),
      }));
    }, 0);
  };
}

async function fetchCollection(collectionName, setError) {
  try {
    const response = await entryService.fetchAll(collectionName);
    if (setError) {
      setError(null);
    }
    return response;
  } catch (error) {
    error = new CustomError(500);
    if (setError) {
      handleError(error, setError);
    } else {
      throw console.error(
        new CustomError(error?.status || error?.response?.status || 500)
      );
    }
  }
}

async function deleteEntry(collectionName, id) {
  try {
    const response = await entryService.delete(collectionName, id);
    return response;
  } catch (error) {
      throw console.error(
        new CustomError(error?.status || error?.response?.status || 500)
      );
    
  }
}

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

export {
  handleFocus,
  handleBlur,
  fetchCollection,
  fetchMenuItemSelectValues,
  handleMenuItemAdd,
};
