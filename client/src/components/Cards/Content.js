// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import Icon from "../Icon/Icon";

class Content extends Component {
  render() {
    const { icon, iconType, iconOnClick, heading } = this.props;

    return (
      <div className="content-card">
        <div className="content-card__heading">
          {icon ? (
            <Icon
              type={iconType}
              className="icon icon--white-primary icon--large icon--active icon--translate content-card__icon"
              onClick={iconOnClick}
            />
          ) : null}
          <h3 className="heading-tertiary font-megrim">{heading}</h3>
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
};

export default Content;
