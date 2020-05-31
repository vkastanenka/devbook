// React
import React from "react";
import PropTypes from "prop-types";

// SVG
import sprite from "../../assets/img/icons.svg";

// SVG icons
const Icon = (props) => {
  return (
    <svg className={props.className} onClick={props.onClick}>
      <use href={`${sprite}#icon-${props.type}`} />
    </svg>
  );
};

Icon.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Icon;
