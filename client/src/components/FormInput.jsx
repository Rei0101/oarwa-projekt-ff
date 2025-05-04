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
  min,
  max,
  maxLength = 100,
  step,
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
        min={min}
        max={max}
        maxLength={maxLength}
        step={step}
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  borderColor: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  maxLength: PropTypes.number,
  step: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};
