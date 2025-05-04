import { MenuItemAddValidation } from "../utils/validation";
import { useEffect, useState } from "react";

function useMenuItemAddForm(initialValues) {
  const [formData, setFormData] = useState(initialValues);
  const [disabledSubmit, setDisabledSubmit] = useState(false);

  useEffect(() => {
    setDisabledSubmit(
      !(
        MenuItemAddValidation.validImageLink(formData.imageLink) &&
        MenuItemAddValidation.validName(formData.name) &&
        MenuItemAddValidation.validPrice(formData.price)
      )
    );
  }, [formData]);

  function handleChange(e) {
    if (e.target.type === "text" || e.target.type === "number") {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      const { name, selectedOptions } = e.target;

      const currentSelected = Array.from(
        selectedOptions,
        (option) => option.value
      );

      setFormData((prevData) => {
        const prevSelected = prevData[name] || [];
        const newSelected = currentSelected.reduce((acc, option) => {
          if (prevSelected.includes(option)) {
            return acc.filter((item) => item !== option);
          } else {
            return [...acc, option];
          }
        }, prevSelected);

        return {
          ...prevData,
          [name]: newSelected,
        };
      });
    }
  }

  return {
    formData,
    setFormData,
    handleChange,
    disabledSubmit,
  };
}

export default useMenuItemAddForm;
