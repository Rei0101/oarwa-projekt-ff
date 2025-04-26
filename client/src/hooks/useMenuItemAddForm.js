import { useState } from "react";

function useMenuItemAddForm(initialValues) {
  const [formData, setFormData] = useState(initialValues);
  const [formError, setFormError] = useState();

  function handleChange(e) {
    const { name, value } = e.target;
    console.log("Name:", name, "Value:", value);

    /* setFormError("Invalid input"); */

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return {
    formData,
    handleChange,
  };
}

export default useMenuItemAddForm;
