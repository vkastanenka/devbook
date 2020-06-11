// React
import React from "react";
import PropTypes from "prop-types";

// Components
import Icon from "../Icon/Icon";

// Card meant to hold content with a heading
const Content = (props) => {
  const {
    icon,
    iconType,
    iconOnClick,
    heading,
    toggleCardLeft,
    toggleCardRight,
  } = props;

  return (
    <div
      className={
        !props.cardClassName
          ? "content-card"
          : `content-card ${props.cardClassName}`
      }
    >
      <div className={"content-card__heading"}>
        {icon ? (
          <Icon
            type={iconType}
            className="icon icon--white-primary icon--large icon--active icon--translate content-card__icon"
            onClick={iconOnClick}
          />
        ) : null}
        {toggleCardLeft ? (
          <Icon
            type="arrow-with-circle-left"
            className="icon icon--white-primary icon--large icon--active icon--translate"
            onClick={toggleCardLeft}
          />
        ) : null}
        <h3 className="heading-tertiary font-megrim ma-x-sm">{heading}</h3>
        {toggleCardRight ? (
          <Icon
            type="arrow-with-circle-right"
            className="icon icon--white-primary icon--large icon--active icon--translate"
            onClick={toggleCardRight}
          />
        ) : null}
      </div>
      <div className="content-card__body">{props.children}</div>
    </div>
  );
};

Content.propTypes = {
  icon: PropTypes.bool,
  iconType: PropTypes.string,
  iconOnClick: PropTypes.func,
  heading: PropTypes.string.isRequired,
  toggleCardLeft: PropTypes.func,
  toggleCardRight: PropTypes.func,
  cardClassName: PropTypes.string,
};

export default Content;
