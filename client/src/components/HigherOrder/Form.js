// React
import React from "react";
import PropTypes from "prop-types";

// Form container
const Form = (props) => {
  return (
    <form
      className={
        !props.formClassName ? "form" : `form ${props.formClassName}`
      }
      onSubmit={props.submitFunction}
    >
      {props.children}
    </form>
  );
};

Form.propTypes = {
  className: PropTypes.string,
  submitFunction: PropTypes.func.isRequired,
};

export default Form;
