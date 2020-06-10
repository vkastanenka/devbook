// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { clearErrors } from "../../store/actions/errorActions";
import { updatePassword, logout } from "../../store/actions/authActions";
import {
  willReceiveErrors,
  clearErrorsOnUnmount,
  prepareRequest,
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

    // Let user know request was a success
    if (Object.keys(this.state.errors).length === 0) {
      this.setState({
        submitting: false,
        disableSubmitButton: false,
        submitted: true,
      });

      // Clear success message after 6 seconds
      this.timer = setTimeout(() => {
        this.setState({ submitted: false });
        this.props.logout();
        clearTimeout(this.timer);
      }, 6000);
    }
  };

  render() {
    const { errors, submitting, submitted, disableSubmitButton } = this.state;

    return (
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
            "Updated! Logging out..."
          )}
        </button>
      </form>
    );
  }
}

UpdatePassword.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  clearErrors,
  updatePassword,
  logout,
})(UpdatePassword);
