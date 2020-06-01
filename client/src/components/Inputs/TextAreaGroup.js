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
      {props.label ? (
        <label htmlFor={props.htmlFor} className={!props.errors ? "form__label" : "form__label fc-danger"}>
          {!props.errors ? props.label : props.errors}
        </label>
      ) : null}
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
  errors: PropTypes.string
};

export default TextAreaGroup;
