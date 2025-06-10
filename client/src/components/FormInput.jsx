import PropTypes from "prop-types";
import { capitalize, kebabCase } from "../utils/helpers";

export default function FormInput({
  name,
  labelAfter = false,
  label = "",
  type = "text",
  value,
  checked = false,
  onChange,
  placeholder,
  required = false,
  borderColor,
  min,
  max,
  maxLength = 100,
  step,
  disabled,
  onFocus,
  onBlur,
}) {
  const formattedName = kebabCase(name);

  const labelElement =
    label.length > 0 ? <label htmlFor={formattedName}>{capitalize(label)}{!labelAfter ? ":" : null}</label> : null;
  const inputElement = (
    <input
      id={formattedName}
      name={formattedName}
      type={type}
      value={value || ""}
      checked={checked}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      style={{ borderColor }}
      min={min}
      max={max}
      maxLength={maxLength}
      step={step}
      disabled={disabled}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );

  return !labelAfter ? (
    <span>
      {labelElement}
      {inputElement}
    </span>
  ) : (
    <span>
      {inputElement}
      {labelElement}
    </span>
  );
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  labelAfter: PropTypes.bool,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  borderColor: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  maxLength: PropTypes.number,
  step: PropTypes.string,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};
