import { useState } from "react";

function useForm(initialValues) {
  const [formData, setFormData] = useState(initialValues);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
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