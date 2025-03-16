import PropTypes from "prop-types";
import { useState } from "react";

export default function ControlledInput({
  name,
  label,
  type = "text",
  required = false,
}) {
  const [input, setInput] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <span>
      <label htmlFor={name}>{label}:</label>
      <input
        id={name}
        name={name}
        type={type}
        value={input}
        onChange={handleInputChange}
        required={required}
      />
    </span>
  );
}

ControlledInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
};
