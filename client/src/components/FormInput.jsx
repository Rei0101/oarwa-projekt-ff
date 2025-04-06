import PropTypes from "prop-types";

export default function FormInput({
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  borderColor,
  max,
  maxLength = 100,
  onFocus,
  onBlur,
}) {
  return (
    <span>
      <label htmlFor={name}>{label}:</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{ borderColor }}
        max={max}
        maxLength={maxLength}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </span>
  );
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  borderColor: PropTypes.string,
  max: PropTypes.string,
  maxLength: PropTypes.number,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};
