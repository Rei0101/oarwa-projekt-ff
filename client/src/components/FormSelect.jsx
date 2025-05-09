import PropTypes from "prop-types";

export default function FormSelect({ name, label, value, onChange, options }) {
  return (
    <span>
      <label htmlFor={name}>{label}:</label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        multiple
        required
      >
        {options.map((option, index) => (
          <option key={index} value={option._id}>
            {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
          </option>
        ))}
      </select>
    </span>
  );
}

FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};
