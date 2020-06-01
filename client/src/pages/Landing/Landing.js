// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Components
import LoginRegister from "../../components/Cards/LoginRegister";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.props.history.push(`/user/${this.props.auth.user.user.handle}`);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.auth.isAuth && nextProps.auth.isAuth) {
      this.props.history.push(`/user/${nextProps.auth.user.user.handle}`);
    }
  }

  render() {
    return (
      <main className="landing">
        <h1 className="heading-primary font-megrim landing__heading">
          DevConnector
        </h1>
        <LoginRegister />
      </main>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
