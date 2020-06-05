// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { updateUserPhoto } from "../../../store/actions/userActions";

// Components
import Auxiliary from "../../../components/HigherOrder/Auxiliary";
import FollowIcon from "./ProfileLayout/FollowIcon";
import SocialMediaLink from "./ProfileLayout/SocialMediaLink";
import SkillsList from "./ProfileLayout/SkillsList";
import FollowList from "./ProfileLayout/FollowList";

class Profile extends Component {
  state = {
    viewing: "profile",
  };

  // Updating user model photo field
  onPhotoSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", e.target.files[0]);
    await this.props.updateUserPhoto(formData);
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
    let user, profile;
    let twIcon, fbIcon, liIcon, ytIcon, inIcon;
    const { currentUser, loading } = this.props;

    if (!loading) {
      user = this.props.users.user;
      profile = user.profile;
      console.log(user.following);
    }


    // Assign social media icons if listed in profile
    if (profile && profile.social) {
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
        {loading ? (
          <div className="profile__head flex flex--abs-center">
            <h2 className="heading-secondary">...</h2>
          </div>
        ) : (
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
                  <label htmlFor="photo-upload" className="profile__pfp-input">
                    Update User Photo
                  </label>
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
        )}
        {loading ? (
          <div className="profile__body flex flex--abs-center">
            <h2 className="heading-secondary">...</h2>
          </div>
        ) : (
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
        )}
      </section>
    );
  }
}

Profile.propTypes = {
  loading: PropTypes.bool,
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  currentUser: PropTypes.bool.isRequired,
  updateUserPhoto: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

export default connect(mapStateToProps, { updateUserPhoto })(Profile);
