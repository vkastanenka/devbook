// React
import React from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Components
import TimelinePost from "./TimelinePost";

// Timeline feed containing all the posts
const TimelineFeed = props => {
  const { posts } = props.users.user;
  let clientPosts;
  let feed = (
    <div className="timeline__feed flex flex--abs-center">
      <p className="text-primary">
        This user has no posts on their timeline
      </p>
    </div>
  );

  if (posts.length !== 0) {
    clientPosts = posts.map((post) => (
      <TimelinePost key={post._id} post={post} />
    ));
    feed = <div className="timeline__feed">{clientPosts}</div>;
  }

  return feed;
};

TimelineFeed.propTypes = {
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps)(TimelineFeed);
