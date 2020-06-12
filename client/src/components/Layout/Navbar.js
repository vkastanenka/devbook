// React
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Components
import Icon from "../Icon/Icon";
import Auxiliary from "../HigherOrder/Auxiliary";
import SideNav from "../Layout/SideNav";

class Navbar extends Component {
  state = {
    viewingOptions: false,
  };

  componentDidMount() {
    if (this.state.viewingOptions) {
      this.setState({ viewingOptions: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.handle !== nextProps.match.params.handle) {
      this.setState({ viewingOptions: false });
    }
  }

  // Prevents requiring a photo that doesn't exist
  tryRequirePhoto = () => {
    try {
      return require(`../../assets/img/users/${this.props.auth.user.photo}`);
    } catch (err) {
      return require("../../assets/img/users/default.jpg");
    }
  };

  render() {
    const { user } = this.props.auth;
    let userLink, sideNav;

    if (!this.props.loading) {
      userLink = (
        <div className="navbar__user">
          <Link to={`/user/${user.handle}`} className="link-style">
            <div className="navbar__current-user">
              {/* eslint-disable-next-line */}
              <img
                src={this.tryRequirePhoto()}
                alt="User photo"
                className="navbar__current-user-photo"
              />
              <h2 className="heading-secondary text-gradient heading-secondary--smaller font-megrim">
                {user.name.split(" ")[0]}
              </h2>
            </div>
          </Link>
          <Icon
            onClick={this.props.showProfile}
            type="level-down"
            className="navbar__profile-icon icon icon--large icon--black-primary icon--active"
          />
        </div>
      );

      sideNav = (
        <SideNav
          active={this.state.viewingOptions}
          inactivate={() => this.setState({ viewingOptions: false })}
        />
      );
    } else {
      userLink = (
        <div className="navbar__current-user">
          {/* eslint-disable-next-line */}
          <img
            src={require("../../assets/img/users/default.jpg")}
            alt="User photo"
            className="navbar__current-user-photo"
          />
          <h2 className="heading-secondary text-gradient heading-secondary--smaller font-megrim">
            Loading...
          </h2>
        </div>
      );
    }

    return (
      <Auxiliary>
        {sideNav}
        <nav className="navbar">
          {userLink}
          <div className="navbar__options">
            <Icon
              onClick={() => this.setState({ viewingOptions: true })}
              type="cog"
              className="navbar__options-icon icon icon--larger icon--black-primary icon--active"
            />
          </div>
        </nav>
      </Auxiliary>
    );
  }
}

Navbar.propTypes = {
  loading: PropTypes.bool,
  auth: PropTypes.object.isRequired,
  showProfile: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(Navbar));
