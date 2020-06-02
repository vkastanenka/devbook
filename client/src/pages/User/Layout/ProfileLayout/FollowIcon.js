// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import {
  followUser,
  unfollowUser,
} from "../../../../store/actions/userActions";

// Components
import Icon from "../../../components/Icon/Icon";

// Icon to follow and unfollow other user profiles
class FollowIcon extends Component {
  state = {
    followed: false,
    isUpdatingFollow: false
  }

  componentDidMount() {
    const currentUser = this.props.auth.user;
    const { user } = this.props.users;
    const followIndex = currentUser.following.indexOf(user._id);
    if (followIndex > -1) this.setState({ followed: true });
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}

FollowIcon.propTypes = {
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
}

const mapStateToProps = state = ({
  auth: state.auth,
  users: state.users
})

export default connect(mapStateToProps, { followUser, unfollowUser })(FollowIcon);
