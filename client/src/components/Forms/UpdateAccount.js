// React
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// Redux
import { connect } from "react-redux";

// Actions
import { clearErrors } from "../../store/actions/errorActions";
import { updateCurrentUser } from "../../store/actions/authActions";
import {
  willReceiveErrors,
  clearErrorsOnUnmount,
  prepareRequest,
  buttonText,
} from "../../utils/formUtils";

// Components
import InputGroup from "../Inputs/InputGroup";

// Form to update account
class UpdateAccount extends Component {
  state = {
    email: "",
    name: "",
    handle: "",
    submitting: false,
    submitted: false,
    disableSubmitButton: false,
    errors: {},
  };

  // Filling fields on mount
  componentDidMount() {
    const { user } = this.props.auth;
    this.setState({
      email: user.email,
      name: user.name,
      handle: user.handle,
    });
  }

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

  // Make a patch request to update current user's account
  onAccountUpdate = async (e) => {
    // Clear errors and notify user of request
    prepareRequest(e, this);

    // Data to patch
    const accountData = {
      email: this.state.email,
      name: this.state.name,
      handle: this.state.handle,
    };

    // PATCH request
    await this.props.updateCurrentUser(accountData);

    // Let user know it was a success
    if (Object.keys(this.state.errors).length === 0) {
      this.setState({
        submitting: false,
        disableSubmitButton: false,
        submitted: true,
      });

      // Clear success message after 6 seconds
      this.timer = setTimeout(() => {
        this.setState({ submitted: false });
        this.props.history.push(`/user/${this.state.handle}`);
        clearTimeout(this.timer);
      }, 6000);
    }
  };

  render() {
    const { errors, submitting, submitted, disableSubmitButton } = this.state;

    return (
      <form className="form" onSubmit={this.onAccountUpdate}>
        <h3 className="text-primary font-megrim pd-y-sm">
          Update User Information
        </h3>
        <InputGroup
          type="email"
          name="email"
          id="email"
          placeholder="Email address"
          value={this.state.email}
          errors={errors.email}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="email"
          label="Email address"
        />
        <InputGroup
          type="text"
          name="name"
          id="name"
          placeholder="Full name"
          value={this.state.name}
          errors={errors.name}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="name"
          label="Full name"
        />
        <InputGroup
          type="text"
          name="handle"
          id="handle"
          htmlFor="handle"
          value={this.state.handle}
          errors={errors.handle}
          placeholder="User handle"
          required={true}
          onChange={(e) => this.onChange(e)}
          label="User handle"
        />
        <div className="form__group">
          <button
            className="btn btn--primary ma-bt-sm"
            type="submit"
            disabled={disableSubmitButton}
          >
            {buttonText(
              submitting,
              submitted,
              "Update information",
              "Updating information...",
              "Updated! Redirecting..."
            )}
          </button>
        </div>
      </form>
    );
  }
}

UpdateAccount.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  updateCurrentUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  clearErrors,
  updateCurrentUser,
})(withRouter(UpdateAccount));
