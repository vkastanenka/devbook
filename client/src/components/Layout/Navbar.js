// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Components
import Icon from "../Icon/Icon";
// import Popup from "../HigherOrder/Popup";
import Auxiliary from "../HigherOrder/Auxiliary";
import SideNav from "../Layout/SideNav";

class Navbar extends Component {
  state = {
    viewingOptions: false,
  };

  // Prevents requiring a photo that doesn't exist
  tryRequirePhoto = () => {
    try {
      return require(`../../assets/img/users/${this.props.auth.user.user.photo}`);
    } catch (err) {
      return require("../../assets/img/users/default.jpg");
    }
  };

  render() {
    const { user } = this.props.auth.user;

    return (
      <Auxiliary>
        <SideNav
          active={this.state.viewingOptions}
          inactivate={() => this.setState({ viewingOptions: false })}
        />
        <nav className="navbar">
          <Link to={`/user/${user.handle}`} className="link-style">
            <div className="navbar__current-user">
              {/* eslint-disable-next-line */}
              <img
                src={this.tryRequirePhoto()}
                alt="User photo"
                className="navbar__current-user-photo"
              />
              <h2 className="heading-secondary heading-secondary--smaller font-megrim">
                {user.name.split(" ")[0]}
              </h2>
            </div>
          </Link>
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
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);
