// React
import React from "react";
import PropTypes from "prop-types";

// Spinner for asynchronous requests
const Spinner = (props) => {
  return (
    <div
      className={
        !props.spinnerClassName
          ? "spinner"
          : `spinner ${props.spinnerClassName}`
      }
    />
  );
};

Spinner.propTypes = {
  spinnerClassName: PropTypes.string,
};

export default Spinner;
