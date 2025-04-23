import axios from "axios";
import CustomError from "../../../shared/CustomErrorClass";
import handleError from "./errorHandler";

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

const fetchCollection = async (collectionName, setError) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/${collectionName}`);
    setError(null);
    return response.data;
  } catch (error) {
    error = new CustomError(500);
    handleError(error, setError)
  }
};

export { handleFocus, handleBlur, fetchCollection };
