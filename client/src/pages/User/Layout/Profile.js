// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Components
import Icon from "../../../components/Icon/Icon";

class Profile extends Component {
  render() {
    const { user } = this.props.users;

    return (
      <section className="profile">
        <div className="profile__head">
          <img
            src={require(`../../../assets/img/users/${user.photo}`)}
            alt=""
            className="profile__pfp"
          />
          <h5 className="profile__heading">{user.name}</h5>
          <p className="text-primary fc-primary">{`@${user.handle}`}</p>
          <p className="text-primary fc-primary">
            {user.profile ? user.profile.status : null}
          </p>
          {user.profile ? (
            <div className="profile__social">
              {user.profile.twitter ? <Icon type="twitter" /> : null}
              {user.profile.facebook ? <Icon type="facebook" /> : null}
              {user.profile.linkedin ? <Icon type="linkedin" /> : null}
              {user.profile.youtube ? <Icon type="youtube" /> : null}
              {user.profile.instagram ? <Icon type="instagram" /> : null}
            </div>
          ) : null}
        </div>
        <div className="profile__body">
          <div className="profile__bio">
            <h5 className="profile__heading">Bio</h5>
            <p className="text-primary">
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
                user.profile.skills.map((skill) => (
                  <li className="profile__skills-list-item" key={skill}>
                    <Icon type="controller-volume" />
                    <span>{skill}</span>
                  </li>
                ))
              ) : (
                <li>This user has not yet provided their developer skills</li>
              )}
            </ul>
          </div>
          <div className="profile__following">
            <h5 className="profile__heading">Following</h5>
            <ul className="profile__following-list">
              {user.following.length > 0 ? (
                user.following.map((user) => (
                  <li
                    className="profile__following-list-item"
                    key={user.handle}
                  >
                    <Link to={`/user/${user.handle}`}>
                      <img
                        src={require(`../../../assets/img/users/${user.photo}`)}
                        alt="Follow Photo"
                        className="profile__following-pfp"
                      />
                      <span>{user.name}</span>
                    </Link>
                  </li>
                ))
              ) : (
                <li>This user has not yet followed any other developers</li>
              )}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  currentUser: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

export default connect(mapStateToProps)(Profile);
