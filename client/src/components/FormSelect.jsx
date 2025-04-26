import PropTypes from "prop-types";

export default function FormSelect({ name, label, value, onChange, options }) {
  return (
    <span>
      <label htmlFor={name}>{label}:</label>
      <select name={name} id={name} value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </span>
  );
}

FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};
