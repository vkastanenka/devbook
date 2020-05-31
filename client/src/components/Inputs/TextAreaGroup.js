import React from "react";
import PropTypes from "prop-types";

// Form textarea group
const TextAreaGroup = (props) => {
  return (
    <div className={`form__group ${props.groupClass}`}>
      <textarea
        name={props.name}
        id={props.id}
        className={`form__input ${props.inputClass}`}
        placeholder={props.placeholder}
        minLength={props.minLength}
        value={props.value}
        required={props.required}
        onChange={props.onChange}
      />
      <label htmlFor={props.htmlFor} className="form__label">
        {props.label}
      </label>
    </div>
  );
};

TextAreaGroup.propTypes = {
  groupClass: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  inputClass: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  minLength: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  htmlFor: PropTypes.string,
  label: PropTypes.string,
};

export default TextAreaGroup;
