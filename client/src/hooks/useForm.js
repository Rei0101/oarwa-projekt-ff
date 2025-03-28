import { registerValidation } from "../utils/validation";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function useForm(initialValues) {
  const [formData, setFormData] = useState(initialValues);
  const [borderColors, setBorderColors] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(
    Object.keys(initialValues).reduce((acc, key) => {
      if (key !== "dateOfBirth") {
        acc[key] = "Ovo polje mora biti popunjeno.";
      } else {
        acc[key] = null;
      }
      return acc;
    }, {})
  );
  const [error, setError] = useState(null);

  const location = useLocation();

  function handleChange(e) {
    const { name, value } = e.target;

    if (location.pathname === "/register") {
      const errorMessage =
        name === "confirmPassword"
          ? registerValidation(name, value, formData.password)
          : registerValidation(name, value);

      setError(errorMessage);

      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
      }));
      setBorderColors((prevColors) => ({
        ...prevColors,
        [name]:
          name === "dateOfBirth" || (!errorMessage && value.trim())
            ? "gold"
            : "crimson",
      }));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return {
    formData,
    setFormData,
    borderColors,
    handleChange,
    formErrors,
    error,
    setError,
  };
}

export default useForm;
