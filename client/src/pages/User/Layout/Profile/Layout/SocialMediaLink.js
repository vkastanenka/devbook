// React
import React from "react";
import PropTypes from "prop-types";

// Components
import Icon from "../../../../../components/Icon/Icon";

// Icons linking to user profile's social media
const SocialMediaLink = props => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`${props.profile.social[props.website]}`}
    >
      <Icon
        type={`${props.website}-with-circle`}
        className="icon icon--large icon--white-primary icon--translate"
      />
    </a>
  );
};

SocialMediaLink.propTypes = {
  profile: PropTypes.object.isRequired,
  website: PropTypes.string.isRequired,
};

export default SocialMediaLink;
