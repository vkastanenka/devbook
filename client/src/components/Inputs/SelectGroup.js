import React from "react";
import PropTypes from "prop-types";

// Form select group
const SelectGroup = (props) => {
  const options = props.options.map((option) => {
    if (option.value === "") {
      return (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          hidden={option.hidden}
        >
          {option.label}
        </option>
      );
    }
    return (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    );
  });

  return (
    <div className={`form__group ${props.groupClass}`}>
      <select
        name={props.name}
        id={props.id}
        className={`form__input ${props.inputClass}`}
        placeholder={props.placeholder}
        value={props.value}
        required={props.required}
        onChange={props.onChange}
      >
        {options}
      </select>
      {props.label ? (
        <label htmlFor={props.htmlFor} className="form__label">
          {props.label}
        </label>
      ) : null}
    </div>
  );
};

SelectGroup.propTypes = {
  options: PropTypes.array.isRequired,
  groupClass: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  inputClass: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  htmlFor: PropTypes.string,
  label: PropTypes.string,
};

export default SelectGroup;
