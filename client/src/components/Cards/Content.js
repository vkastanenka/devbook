// React TODO: Change to functional component
import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import Icon from "../Icon/Icon";

class Content extends Component {
  render() {
    const {
      icon,
      iconType,
      iconOnClick,
      heading,
      toggleCardLeft,
      toggleCardRight,
    } = this.props;

    return (
      <div
        className={
          !this.props.cardClassName
            ? "content-card"
            : `content-card ${this.props.cardClassName}`
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
        <div className="content-card__body">{this.props.children}</div>
      </div>
    );
  }
}

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
