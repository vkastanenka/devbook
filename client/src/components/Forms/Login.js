// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { clearErrors } from "../../store/actions/errorActions";
import { login, sendPasswordResetToken } from "../../store/actions/authActions";
import {
  clearErrorsOnUnmount,
  prepareRequest,
  buttonText,
} from "../../utils/formUtils";

// Components
import InputGroup from "../Inputs/InputGroup";
import Auxiliary from "../HigherOrder/Auxiliary";

// Login form to log a user into the site
class Login extends Component {
  state = {
    loginEmail: "",
    loginPassword: "",
    submitting: false,
    disableSubmitButton: false,
    forgotPassword: false,
    sendingToken: false,
    sentToken: false,
    disableTokenButton: false,
    errors: {},
  };

  // Binding timer to component instance
  timer = null;

  // Alerting user of errors / success / progress
  componentWillReceiveProps(nextProps) {
    if (this.state.submitting && Object.keys(nextProps.errors).length > 0) {
      this.setState({
        errors: nextProps.errors,
        submitting: false,
        disableSubmitButton: false,
      });

      this.timer = setTimeout(() => {
        this.props.clearErrors();
        clearTimeout(this.timer);
      }, 6000);
    }

    if (this.state.sendingToken && Object.keys(nextProps.errors).length > 0) {
      this.setState({
        errors: nextProps.errors,
        sendingToken: false,
        disableTokenButton: false,
      });

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

  // Clear any timers and errors when form unmounts
  componentWillUnmount() {
    clearErrorsOnUnmount(this);
  }

  // State handler for input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Make a post request to login a new user
  onLoginSubmit = async (e) => {
    // Clear errors and notify user of request
    prepareRequest(e, this);

    // Change forgot password
    if (this.state.forgotPassword) this.setState({ forgotPassword: false });

    // User data to post
    const userData = {
      loginEmail: this.state.loginEmail,
      loginPassword: this.state.loginPassword,
    };

    // Login user
    await this.props.login(userData);
  };

  // Send password reset token to reset password
  onSendPasswordResetToken = async (e) => {
    e.preventDefault();

    // Clear errors if any before submitting
    if (Object.keys(this.props.errors).length > 0) this.props.clearErrors();

    // Let user know request is happening and disable button
    this.setState({ sendingToken: true, disableTokenButton: true });

    // Send token
    await this.props.sendPasswordResetToken({ email: this.state.loginEmail });

    // If successful, alert user
    if (Object.keys(this.props.errors).length === 0) {
      this.setState({
        sendingToken: false,
        sentToken: true,
      });

      // Clear success message after 6 seconds
      this.timer = setTimeout(() => {
        this.setState({
          sentToken: false,
          disableTokenButton: false,
          forgotPassword: false,
        });
        clearTimeout(this.timer);
      }, 6000);
    }
  };

  render() {
    const {
      errors,
      loginEmail,
      loginPassword,
      forgotPassword,
      disableTokenButton,
      sendingToken,
      sentToken,
      disableSubmitButton,
      submitting,
    } = this.state;

    return (
      <Auxiliary>
        <form
          className={
            !this.props.formClassName
              ? "form"
              : `form ${this.props.formClassName}`
          }
          onSubmit={this.onLoginSubmit}
        >
          <h2 className="heading-secondary ma-bt-sm">Login</h2>
          <InputGroup
            type="email"
            name="loginEmail"
            id="email"
            placeholder="Email address"
            value={loginEmail}
            required={true}
            onChange={(e) => this.onChange(e)}
            htmlFor="email"
            label="Email address"
            errors={errors.loginEmail}
          />
          <InputGroup
            type="password"
            name="loginPassword"
            id="password"
            placeholder="Password"
            value={loginPassword}
            required={true}
            onChange={(e) => this.onChange(e)}
            htmlFor="password"
            label="Password"
            errors={errors.loginPassword}
          />
          <div className="form__group flex flex--center ma-bt-lg">
            {!forgotPassword ? (
              <button
                type="button"
                className="btn-text"
                onClick={() => this.setState({ forgotPassword: true })}
                disabled={disableTokenButton}
              >
                Forgot your password?
              </button>
            ) : (
              <button
                type="button"
                className="btn-text"
                onClick={this.onSendPasswordResetToken}
                disabled={disableTokenButton}
              >
                {buttonText(
                  sendingToken,
                  sentToken,
                  "Email password reset token",
                  "Emailing password reset token...",
                  "Email sent!"
                )}
              </button>
            )}
          </div>
          <div className="form__group">
            <button
              type="submit"
              className="btn btn--primary"
              disabled={disableSubmitButton}
            >
              {!submitting ? "Login" : "Logging In..."}
            </button>
          </div>
        </form>
      </Auxiliary>
    );
  }
}

Login.propTypes = {
  errors: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  sendPasswordResetToken: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, {
  login,
  clearErrors,
  sendPasswordResetToken,
})(Login);
