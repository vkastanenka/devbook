// React
import React from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Components
import TimelinePost from "./TimelinePost";

// Timeline feed containing all the posts
const TimelineFeed = (props) => {
  const { posts } = props.users.user;
  const { user } = props.auth;
  const { _id } = props.users.user.user;
  let feedClass;
  if (user._id === _id) {
    feedClass = "timeline__feed timeline__feed--user";
  } else {
    feedClass = "timeline__feed timeline__feed--other";
  }
  let clientPosts;
  let feed = (
    <div className={`${feedClass} flex flex--abs-center`}>
      <p className="text-primary">This user has no posts on their timeline</p>
    </div>
  );

  if (posts.length !== 0) {
    clientPosts = posts.map((post) => (
      <TimelinePost key={post._id} post={post} />
    ));
    feed = <div className={`${feedClass} timeline__feed`}>{clientPosts}</div>;
  }

  return feed;
};

TimelineFeed.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

export default connect(mapStateToProps)(TimelineFeed);
