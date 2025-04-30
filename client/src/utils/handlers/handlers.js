import axios from "axios";
import CustomError from "../../../../shared/CustomErrorClass";
import handleError from "./errorHandler";
import collectionService from "../../services/collectionService";

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
    const response = await collectionService.fetch(collectionName);
    if (setError) {
      setError(null);
    }
    return response;
  } catch (error) {
    error = new CustomError(500);
    if (setError) {
      handleError(error, setError);
    } else {
      throw console.error(new CustomError(error.status, error.message));
    }
  }
}

async function fetchMenuItemAddSelectValues() {
  try {
    const [categories, ingredients] = await Promise.all([
      fetchCollection("categories"),
      fetchCollection("ingredients"),
    ]);
    return { categories, ingredients };
  } catch (error) {
    return console.error(new CustomError(error.status, error.message));
  }
}

async function handleMenuItemAdd(e) {
  e.preventDefault();
  console.log("submitted");
}

export {
  handleFocus,
  handleBlur,
  fetchCollection,
  fetchMenuItemAddSelectValues,
  handleMenuItemAdd,
};
