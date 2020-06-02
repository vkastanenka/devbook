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
import Icon from "../../../../components/Icon/Icon";

// Icon to follow and unfollow other user profiles
class FollowIcon extends Component {
  state = {
    followed: false,
    isUpdatingFollow: false,
  };

  // Sets state to display icon/action depending on whether or not user is followed
  componentDidMount() {
    const currentUser = this.props.auth.user.user;
    const { user } = this.props.users;
    const followIndex = currentUser.following.indexOf(user._id);
    if (followIndex > -1) this.setState({ followed: true });
  }

  // Changes icon / action once user is followed / unfollowed
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.user.user.following.indexOf(this.props.users.user._id) > -1) {
      this.setState({ followed: true });
    } else {
      this.setState({ followed: false });
    }
  }

  // Action to unfollow user
  willUnfollowUser = async (userID) => {
    // Change state to display spinner
    this.setState({ isUpdatingFollow: true });

    // DELETE request to unfollow user
    await this.props.unfollowUser(userID);

    // Change state to revert spinner
    this.setState({ isUpdatingFollow: false });
  };

  // Action to follow user
  willFollowUser = async (userID) => {
    // Change state to display spinner
    this.setState({ isUpdatingFollow: true });

    // POST request to follow user
    await this.props.followUser(userID);

    // Change state to revert spinner
    this.setState({ isUpdatingFollow: false });
  };

  render() {
    let followIcon;
    const { user } = this.props.users;

    if (this.state.isUpdatingFollow) {
      followIcon = (
        <div className="profile__social-alerts">
          <Icon type="cw" className="icon icon--large icon--white rotate" />
        </div>
      );
    } else if (this.state.followed) {
      followIcon = (
        <div
          className="profile__social-alerts"
          onClick={() => this.willUnfollowUser(user._id)}
        >
          <Icon type="user" className="icon icon--large icon--white" />
          <Icon type="heart" className="icon icon--small icon--primary" />
        </div>
      );
    } else if (!this.state.followed) {
      followIcon = (
        <div
          className="profile__social-alerts"
          onClick={() => this.willFollowUser(user._id)}
        >
          <Icon type="add-user" className="icon icon--large icon--white" />
        </div>
      );
    }

    return followIcon;
  }
}

FollowIcon.propTypes = {
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

export default connect(mapStateToProps, { followUser, unfollowUser })(
  FollowIcon
);
