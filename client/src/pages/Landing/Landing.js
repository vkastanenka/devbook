// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Components
import Alert from "../../components/Alert/Alert";
import LoginRegister from "../../components/Cards/LoginRegister";

// DevConnector landing Page
class Landing extends Component {
  // If authenticated, push user to their profile card
  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.props.history.push(`/user/${this.props.auth.user.user.handle}`);
    }
  }

  // If user authenticates, push them to their profile card
  componentWillReceiveProps(nextProps) {
    if (!this.props.auth.isAuth && nextProps.auth.isAuth) {
      this.props.history.push(`/user/${nextProps.auth.user.user.handle}`);
    }
  }

  render() {
    return (
      <main className="landing">
        {this.props.errors.server500 ? (
          <Alert type="error" message={this.props.errors.server500} />
        ) : null}
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
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps)(Landing);
