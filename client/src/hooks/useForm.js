import { useState } from "react";
import { handleChange as handleChangeUtil } from "../utils/handlers";

function useForm(initialValues) {
  const [formData, setFormData] = useState(initialValues);
  const [error, setError] = useState(null);

  function handleChange(e) {
    handleChangeUtil(e, setFormData)
  };

  function resetForm() {
    setFormData(initialValues);
    setError(null);
  };

  return {
    formData,
    handleChange,
    resetForm,
    error,
    setError,
  };
};

export default useForm;