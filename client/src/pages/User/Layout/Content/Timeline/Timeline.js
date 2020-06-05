// React
import React from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Components
import TimelineForm from "./Layout/TimelineForm";
import TimelineFeed from "./Layout/TimelineFeed";

// Timeline of user's and user's follow's posts
const Timeline = (props) => {
  return (
    <div className="timeline">
      {props.auth.user.user._id === props.users.user._id ? (
        <TimelineForm />
      ) : null}
      <TimelineFeed />
    </div>
  );
};

Timeline.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

export default connect(mapStateToProps)(Timeline);
