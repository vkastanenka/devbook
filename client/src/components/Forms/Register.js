// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { register } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/errorActions";

// Components
import InputGroup from "../Inputs/InputGroup";

// Form for registering new users
class Register extends Component {
  state = {
    registerName: "",
    registerEmail: "",
    registerPassword: "",
    registerPasswordConfirm: "",
    submitting: false,
    disableSubmitButton: false,
    submitted: false,
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

    // Clear errors from state when global errors cleared
    if (
      Object.keys(this.state.errors).length > 0 &&
      Object.keys(nextProps.errors).length === 0
    ) {
      clearTimeout(this.timer);
      this.setState({ errors: {} });
    }
  }

  // Clear any timers when form unmounts
  componentWillUnmount() {
    clearTimeout(this.timer);
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors();
    }
  }

  // State handler for input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Make a post request to register a new user
  onRegisterSubmit = async (e) => {
    e.preventDefault();

    // Clear errors if any before submitting
    if (Object.keys(this.props.errors).length > 0) this.props.clearErrors();

    // Let user know request is happening and disable button
    this.setState({ submitting: true, disableSubmitButton: true });

    // User data to post
    const newUser = {
      registerName: this.state.registerName,
      registerEmail: this.state.registerEmail,
      registerPassword: this.state.registerPassword,
      registerPasswordConfirm: this.state.registerPasswordConfirm,
    };

    // Register new user in the DB
    await this.props.register(newUser);

    // 3. Let user know it was a success
    if (Object.keys(this.state.errors).length === 0) {
      this.setState({
        registerName: "",
        registerEmail: "",
        registerPassword: "",
        registerPasswordConfirm: "",
        submitting: false,
        disableSubmitButton: false,
        submitted: true,
      });
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <form
        className={
          !this.props.formClassName
            ? "form"
            : `form ${this.props.formClassName}`
        }
        onSubmit={this.onRegisterSubmit}
      >
        <h2 className="heading-secondary ma-bt-md">Register</h2>
        <div className="text-primary fc-danger">{errors.server500}</div>
        <InputGroup
          type="text"
          name="registerName"
          id="name"
          placeholder="Full name"
          value={this.state.registerName}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="name"
          label="Full name"
        />
        <InputGroup
          type="email"
          name="registerEmail"
          id="email"
          placeholder="Email address"
          value={this.state.registerEmail}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="email"
          label="Email address"
        />
        <InputGroup
          type="password"
          name="registerPassword"
          id="password"
          placeholder="Password"
          value={this.state.registerPassword}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="password"
          label="Password"
        />
        <InputGroup
          type="password"
          name="registerPasswordConfirm"
          id="passwordConfirm"
          placeholder="Confirm Password"
          value={this.state.registerPasswordConfirm}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="passwordConfirm"
          label="Confirm Password"
        />
        {!this.state.submitted ? (
          <div className="form__group">
            <button
              type="submit"
              className="btn btn--primary"
              disabled={this.state.disableSubmitButton}
            >
              {!this.state.submitting ? "Register" : "submitting..."}
            </button>
          </div>
        ) : null}
      </form>
    );
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
