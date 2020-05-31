// React
import React from "react";
import PropTypes from "prop-types";

// Form input group
const InputGroup = (props) => {
  return (
    <div className={`form__group ${props.groupClass}`}>
      <input
        type={props.type}
        name={props.name}
        id={props.id}
        className={`form__input ${props.inputClass}`}
        placeholder={props.placeholder}
        minLength={props.minLength}
        value={props.value}
        required={props.required}
        onChange={props.onChange}
        onFocus={props.onFocus}
      />
      {props.label ? (
        <label htmlFor={props.htmlFor} className="form__label">
          {props.label}
        </label>
      ) : null}
    </div>
  );
};

InputGroup.propTypes = {
  groupClass: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  inputClass: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  minLength: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  htmlFor: PropTypes.string,
  label: PropTypes.string,
};

export default InputGroup;
