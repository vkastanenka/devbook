// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { updateUserPhoto } from "../../../store/actions/userActions";
import { clearErrors } from "../../../store/actions/errorActions";

// Components
import Auxiliary from "../../../components/HigherOrder/Auxiliary";
import FollowIcon from "./ProfileLayout/FollowIcon";
import SocialMediaLink from "./ProfileLayout/SocialMediaLink";
import SkillsList from "./ProfileLayout/SkillsList";
import FollowList from './ProfileLayout/FollowList'

class Profile extends Component {
  state = {
    viewing: "profile",
    errors: {},
  };

  // Binding timer to component instance
  timer = null;

  // Alerting user of errors / success / progress
  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.errors).length > 0) {
      this.setState({ errors: nextProps.errors });

      this.timer = setTimeout(() => {
        this.props.clearErrors();
        clearTimeout(this.timer);
      }, 6000);
    }

    // Clear errors from state when global errors cleared
    if (
      Object.keys(this.state.errors).length > 0 &&
      Object.keys(nextProps.errors).length === 0
    ) {
      clearTimeout(this.timer);
      this.setState({ errors: {} });
    }
  }

  // Clear any timers when form unmounts
  componentWillUnmount() {
    clearTimeout(this.timer);
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors();
    }
  }

  // Updating user model photo field
  onPhotoSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", e.target.files[0]);
    this.props.updateUserPhoto(formData);
  };

  // Prevents requiring a photo that doesn't exist
  tryRequirePhoto = () => {
    try {
      return require(`../../../assets/img/users/${this.props.users.user.photo}`);
    } catch (err) {
      return require("../../../assets/img/users/default.jpg");
    }
  };

  render() {
    const { user } = this.props.users;
    const { profile } = user;
    const { currentUser } = this.props;
    let twIcon, fbIcon, liIcon, ytIcon, inIcon;

    // Assign social media icons if listed in profile
    if (profile.social) {
      if (profile.social.twitter)
        twIcon = <SocialMediaLink profile={profile} website="twitter" />;

      if (profile.social.facebook)
        fbIcon = <SocialMediaLink profile={profile} website="facebook" />;

      if (profile.social.linkedin)
        liIcon = <SocialMediaLink profile={profile} website="linkedin" />;

      if (profile.social.youtube)
        ytIcon = <SocialMediaLink profile={profile} website="youtube" />;

      if (profile.social.instagram)
        inIcon = <SocialMediaLink profile={profile} website="instagram" />;
    }

    return (
      <section className="user__profile profile">
        <div className="profile__head">
          {!currentUser ? <FollowIcon /> : null}
          <div
            className={
              currentUser
                ? `profile__pfp-container profile__pfp-container--current-user ma-bt-sm`
                : `profile__pfp-container ma-bt-sm`
            }
          >
            {/* eslint-disable-next-line */}
            <img
              src={this.tryRequirePhoto()}
              alt="User photo"
              className="profile__pfp"
            />
            {currentUser ? (
              <Auxiliary>
                {!this.state.errors.server500 ? (
                  <label htmlFor="photo-upload" className="profile__pfp-input">
                    Update User Photo
                  </label>
                ) : (
                  <p className="profile__pfp-input">Only images accepted!</p>
                )}
                <input
                  type="file"
                  name="photo"
                  id="photo-upload"
                  className="invisible"
                  onChange={this.onPhotoSubmit}
                />
              </Auxiliary>
            ) : null}
          </div>
          <h5 className="profile__heading">{user.name}</h5>
          <p className="text-secondary fc-primary">{`@${user.handle}`}</p>
          <p className="text-secondary">
            {user.profile ? user.profile.status : null}
          </p>
          {profile ? (
            <div className="profile__social">
              {twIcon}
              {fbIcon}
              {liIcon}
              {ytIcon}
              {inIcon}
            </div>
          ) : null}
        </div>
        <div className="profile__body">
          <div className="profile__body-selection ma-bt-sm">
            <p
              className="text-secondary fw-medium"
              onClick={() => this.setState({ viewing: "profile" })}
            >
              Profile
            </p>
            <p
              className="text-secondary fw-medium"
              onClick={() => this.setState({ viewing: "following" })}
            >
              Following
            </p>
          </div>
          {this.state.viewing === "profile" ? (
            <Auxiliary>
              <div className="profile__bio ma-bt-sm">
                <h5 className="profile__heading">Bio</h5>
                <p className="text-secondary">
                  {user.profile
                    ? user.profile.bio
                      ? user.profile.bio
                      : "This user has not yet filled out their developer bio."
                    : "This user has not yet filled out their developer bio."}
                </p>
              </div>
              <div className="profile__skills">
                <h5 className="profile__heading">Skills</h5>
                <ul className="profile__skills-list">
                  {user.profile ? (
                    <SkillsList skills={user.profile.skills} />
                  ) : (
                    <li className="profile__skills-list-item">
                      <span>
                        This user has not yet provided their developer skills
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </Auxiliary>
          ) : (
            <div className="profile__following">
              <h5 className="profile__heading ma-bt-sm">Following</h5>
              <ul className="profile__following-list">
                {user.following.length > 0 ? (
                  <FollowList following={user.following} />
                ) : (
                  <li className="profile__following-list-item">
                    <span>
                      This user has not yet followed any other developers
                    </span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </section>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  currentUser: PropTypes.bool.isRequired,
  updateUserPhoto: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
  errors: state.errors,
});

export default connect(mapStateToProps, { updateUserPhoto, clearErrors })(
  Profile
);
