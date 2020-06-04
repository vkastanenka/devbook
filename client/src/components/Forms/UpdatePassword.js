// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { clearErrors } from "../../store/actions/errorActions";
import { updatePassword } from "../../store/actions/authActions";
import {
  willReceiveErrors,
  clearErrorsOnUnmount,
  prepareRequest,
  finishRequest,
  buttonText,
} from "../../utils/formUtils";

// Components
import InputGroup from "../Inputs/InputGroup";

// Form to update password
class UpdatePassword extends Component {
  state = {
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
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

  // Make a patch request to update current user's password
  onPasswordUpdate = async (e) => {
    // Clear errors and notify user of request
    prepareRequest(e, this);

    // Data to patch
    const passData = {
      currentPassword: this.state.currentPassword,
      newPassword: this.state.newPassword,
      newPasswordConfirm: this.state.newPasswordConfirm,
    };

    // PATCH request
    await this.props.updatePassword(passData);

    // Let user know it was a success
    finishRequest(this);
  };

  render() {
    const { errors, submitting, submitted, disableSubmitButton } = this.state;

    return (
      // TODO:
      //   <form
      //   className={
      //     !this.props.formClassName
      //       ? "form"
      //       : `form ${this.props.formClassName}`
      //   }
      //   onSubmit={this.onRegisterSubmit}
      // >
      <form className="form ma-y-sm" onSubmit={this.onPasswordUpdate}>
        <h3 className="text-primary font-megrim pd-y-sm">Update Password</h3>
        <InputGroup
          type="password"
          name="currentPassword"
          id="currentPassword"
          placeholder="Current password"
          value={this.state.currentPassword}
          minLength="8"
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="currentPassword"
          label="Current password"
          errors={errors.currentPassword}
        />
        <InputGroup
          type="password"
          name="newPassword"
          id="newPassword"
          placeholder="New password"
          value={this.state.newPassword}
          minLength="8"
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="newPassword"
          label="New password"
          errors={errors.newPassword}
        />
        <InputGroup
          type="password"
          name="newPasswordConfirm"
          id="newPasswordConfirm"
          placeholder="Confirm new password"
          value={this.state.newPasswordConfirm}
          minLength="8"
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="newPasswordConfirm"
          label="Confirm new password"
          errors={errors.newPasswordConfirm}
        />
        {/* TODO:
        <div className="form__group">
        */}
        <button
          className="btn btn--primary ma-bt-sm"
          type="submit"
          disabled={disableSubmitButton}
        >
          {buttonText(
            submitting,
            submitted,
            "Update password",
            "Updating password...",
            "Updated password!"
          )}
        </button>
        {/* TODO:
        </div>
        */}
      </form>
    );
  }
}

UpdatePassword.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { clearErrors, updatePassword })(UpdatePassword);
