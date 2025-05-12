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

async function deleteEntry(collectionName, id, collectionData, setCollectionData) {
  try {
    const response = await entryService.delete(collectionName, id);
    setCollectionData(collectionData.filter((data) => data._id !== id));
    return response;
  } catch (error) {
    throw console.error(
      new CustomError(error?.status || error?.response?.status || 500)
    );
  }
}


export {
  handleFocus,
  handleBlur,
  fetchCollection,
  deleteEntry,
};
