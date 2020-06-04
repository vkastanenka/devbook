// React
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { clearErrors } from "../../store/actions/errorActions";
import { resetPassword } from "../../store/actions/authActions";
import {
  willReceiveErrors,
  clearErrorsOnUnmount,
  prepareRequest,
  buttonText,
} from "../../utils/formUtils";

// Components
import Form from "../HigherOrder/Form";
import InputGroup from "../Inputs/InputGroup";

class ResetPassword extends Component {
  state = {
    password: "",
    passwordConfirm: "",
    submitting: false,
    submitted: false,
    disableSubmitButton: false,
    errors: {},
  };

  // Binding timer to component instance
  timer = null;

  // Alerting user of errors / success / progress
  componentWillReceiveProps(nextProps) {
    willReceiveErrors(this, nextProps);
  }

  // Clear any timers when form unmounts
  componentWillUnmount() {
    clearErrorsOnUnmount(this);
  }

  // State handler for input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Make a patch request to reset the current user's password
  onPasswordReset = async (e) => {
    // Clear errors and notify user of request
    prepareRequest(e, this);

    // Data to patch
    const passData = {
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };

    // PATCH request
    await this.props.resetPassword(passData, this.props.token);

    // Let user know request was a success
    if (Object.keys(this.state.errors).length === 0) {
      this.setState({
        submitting: false,
        disableSubmitButton: false,
        submitted: true,
      });

      // Clear success message after 6 seconds and close
      this.timer = setTimeout(() => {
        this.setState({ submitted: false });
        clearTimeout(this.timer);
        this.props.closeForm();
        this.props.history.push("/");
      }, 6000);
    }
  };

  render() {
    const { errors, submitting, submitted, disableSubmitButton } = this.state;

    return (
      <Form formClassName="ma-y-sm" submitFunction={this.onPasswordReset}>
        <InputGroup
          type="password"
          name="password"
          id="password"
          placeholder="New password"
          value={this.state.password}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="password"
          label="New password"
          errors={errors.password || errors.invalidToken}
        />
        <InputGroup
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          placeholder="Confirm new password"
          value={this.state.passwordConfirm}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="passwordConfirm"
          label="Confirm new password"
          errors={errors.passwordConfirm || errors.invalidToken}
        />
        <div className="form__group">
          <button
            className="btn btn--primary"
            type="submit"
            disabled={disableSubmitButton}
          >
            {buttonText(
              submitting,
              submitted,
              "Reset password",
              "Resetting password...",
              "Reset password!"
            )}
          </button>
        </div>
      </Form>
    );
  }
}

ResetPassword.propTypes = {
  token: PropTypes.string.isRequired,
  closeForm: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { clearErrors, resetPassword })(
  withRouter(ResetPassword)
);
