// React
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Components
import Alert from "../../components/Alert/Alert";
import Popup from "../../components/HigherOrder/Popup";
import ContentCard from "../../components/Cards/Content";
import Auxiliary from "../../components/HigherOrder/Auxiliary";
import ResetPassword from "../../components/Forms/ResetPassword";
import LoginRegister from "../../components/Cards/LoginRegister";

// DevConnector landing Page
class Landing extends Component {
  state = {
    resettingPassword: false,
    passwordResetToken: "",
  };

  // If authenticated, push user to their profile card
  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.props.history.push(`/user/${this.props.auth.user.user.handle}`);
    } else if (this.props.match.params.token) {
      this.setState({
        resettingPassword: true,
        passwordResetToken: this.props.match.params.token,
      });
    }
  }

  // If user authenticates, push them to their profile card
  componentWillReceiveProps(nextProps) {
    if (!this.props.auth.isAuth && nextProps.auth.isAuth) {
      this.props.history.push(`/user/${nextProps.auth.user.user.handle}`);
    }
  }

  render() {
    let popupCard;
    if (this.state.resettingPassword) {
      popupCard = (
        <Popup>
          <ContentCard
            heading="Reset Password"
            icon={true}
            iconType="cross"
            iconOnClick={() => {
              this.setState({ resettingPassword: false });
              this.props.history.push("/");
            }}
          >
            <ResetPassword
              token={this.state.passwordResetToken}
              closeForm={() => this.setState({ resettingPassword: false })}
            />
          </ContentCard>
        </Popup>
      );
    }

    return (
      <Auxiliary>
        {popupCard}
        <main className="landing">
          {this.props.errors.server500 ? (
            <Alert type="error" message={this.props.errors.server500} />
          ) : null}
          {this.props.errors.passwordReset ? (
            <Alert type="error" message={this.props.errors.passwordReset} />
          ) : null}
          <h1 className="heading-primary font-megrim landing__heading">
            DevConnector
          </h1>
          <LoginRegister />
        </main>
      </Auxiliary>
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

export default connect(mapStateToProps)(withRouter(Landing));
