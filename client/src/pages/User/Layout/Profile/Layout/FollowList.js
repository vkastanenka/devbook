// React
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const FollowList = (props) => {
  const following = props.following.map((follow) => {
    let followName = follow.name;
    if (followName.length > 11) {
      followName = `${followName.slice(0, 11)}...`;
    }

    return (
      <li className="profile__following-list-item" key={follow.handle}>
        <Link to={`/user/${follow.handle}`}>
          {/* eslint-disable-next-line */}
          <img
            src={require(`../../../../../assets/img/users/${follow.photo}`)}
            alt="Follow Photo"
            className="profile__following-pfp"
          />
          <span>{followName}</span>
        </Link>
      </li>
    );
  });

  return following;
};

FollowList.propTypes = {
  following: PropTypes.array.isRequired,
};

export default FollowList;
