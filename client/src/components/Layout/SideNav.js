// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { logout } from "../../store/actions/authActions";

// Components
import Icon from "../Icon/Icon";
import Popup from "../HigherOrder/Popup";
import Auxiliary from "../HigherOrder/Auxiliary";
import ContentCard from "../Cards/Content";
import BrowseDevelopers from "../Forms/BrowseDevelopers";
import UpdateProfile from "../Forms/UpdateProfile";
import UpdateAccount from "../Forms/UpdateAccount";
import UpdatePassword from "../Forms/UpdatePassword";

class SideNav extends Component {
  state = {
    browsingDevelopers: false,
    creatingProfile: false,
    updatingProfile: false,
    updatingAccount: false,
  };

  render() {
    const { user } = this.props.auth.user;
    const { active, inactivate } = this.props;
    let popupCard;

    if (this.state.browsingDevelopers) {
      popupCard = (
        <Popup>
          <ContentCard
            heading="Browse Developers"
            icon={true}
            iconType="cross"
            iconOnClick={() => {
              this.setState({ browsingDevelopers: false });
              this.props.inactivate();
            }}
          >
            <BrowseDevelopers
              closeForm={() => {
                this.setState({ browsingDevelopers: false });
                this.props.inactivate();
              }}
            />
          </ContentCard>
        </Popup>
      );
    } else if (this.state.creatingProfile) {
      popupCard = (
        <Popup>
          <ContentCard
            heading="Create Profile"
            icon={true}
            iconType="cross"
            iconOnClick={() => {
              this.setState({ creatingProfile: false });
              this.props.inactivate();
            }}
          >
            <UpdateProfile new={true} />
          </ContentCard>
        </Popup>
      );
    } else if (this.state.updatingProfile) {
      popupCard = (
        <Popup>
          <ContentCard
            heading="Update Profile"
            icon={true}
            iconType="cross"
            iconOnClick={() => {
              this.setState({ updatingProfile: false });
              this.props.inactivate();
            }}
          >
            <UpdateProfile new={false} />
          </ContentCard>
        </Popup>
      );
    } else if (this.state.updatingAccount) {
      popupCard = (
        <Popup>
          <ContentCard
            heading="Update Account"
            icon={true}
            iconType="cross"
            iconOnClick={() => {
              this.setState({ updatingAccount: false });
              this.props.inactivate();
            }}
          >
            <div className="content-card__content content-card__content--update-account ma-y-sm">
              <UpdateAccount />
              <UpdatePassword />
            </div>
          </ContentCard>
        </Popup>
      );
    }

    return (
      <Auxiliary>
        {popupCard}
        <nav
          className={
            active ? "sidenav sidenav--active" : "sidenav sidenav--inactive"
          }
        >
          <Icon
            type="cross"
            className="icon icon--large icon--white-primary icon--active icon--translate sidenav__icon-close"
            onClick={inactivate}
          />
          <h3 className="heading-tertiary font-megrim ma-bt-lg">
            User Options
          </h3>
          <ul className="sidenav__options">
            <li
              onClick={() => this.setState({ browsingDevelopers: true })}
              className="sidenav__option"
            >
              Browse Developers
            </li>
            {!user.profile ? (
              <li
                onClick={() => this.setState({ creatingProfile: true })}
                className="sidenav__option"
              >
                Create Profile
              </li>
            ) : (
              <li
                onClick={() => this.setState({ updatingProfile: true })}
                className="sidenav__option"
              >
                Update Profile
              </li>
            )}
            <li
              onClick={() => this.setState({ updatingAccount: true })}
              className="sidenav__option"
            >
              Update Account
            </li>
            <li onClick={() => this.props.logout()} className="sidenav__option">
              Logout
            </li>
          </ul>
        </nav>
      </Auxiliary>
    );
  }
}

SideNav.propTypes = {
  active: PropTypes.bool.isRequired,
  inactivate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(SideNav);
