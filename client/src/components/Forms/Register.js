// React
import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

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
    registerEmail: "",
    registerName: "",
    registerHandle: "",
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
      registerEmail: this.state.registerEmail,
      registerName: this.state.registerName,
      registerHandle: this.state.registerHandle,
      registerPassword: this.state.registerPassword,
      registerPasswordConfirm: this.state.registerPasswordConfirm,
    };

    // Register new user in the DB
    await this.props.register(newUser);

    // 3. Let user know it was a success
    if (Object.keys(this.state.errors).length === 0) {
      this.setState({
        registerEmail: "",
        registerName: "",
        registerHandle: "",
        registerPassword: "",
        registerPasswordConfirm: "",
        submitting: false,
        disableSubmitButton: false,
        submitted: true,
      });
      this.props.onRegister();
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
        <h2 className="heading-secondary ma-bt-sm">Register</h2>
        <CSSTransition in={errors.server500} timeout={300} classNames="fade-in">
          <div className="text-primary fc-danger fw-medium ma-bt-sm">
            {errors.server500}
          </div>
        </CSSTransition>
        <InputGroup
          type="email"
          name="registerEmail"
          id="registerEmail"
          placeholder="Email address"
          value={this.state.registerEmail}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="registerEmail"
          label="Email address"
          errors={errors.registerEmail}
        />
        <InputGroup
          type="text"
          name="registerName"
          id="registerName"
          placeholder="Full name"
          value={this.state.registerName}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="registerName"
          label="Full name"
          errors={errors.registerName}
        />
        <InputGroup
          type="text"
          name="registerHandle"
          id="registerHandle"
          placeholder="User handle"
          value={this.state.registerHandle}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="registerHandle"
          label="User handle"
          errors={errors.registerHandle}
        />
        <InputGroup
          type="password"
          name="registerPassword"
          id="registerPassword"
          placeholder="Password"
          value={this.state.registerPassword}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="registerPassword"
          label="Password"
          errors={errors.registerPassword}
        />
        <InputGroup
          type="password"
          name="registerPasswordConfirm"
          id="registerPasswordConfirm"
          placeholder="Confirm Password"
          value={this.state.registerPasswordConfirm}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="registerPasswordConfirm"
          label="Confirm Password"
          errors={errors.registerPasswordConfirm}
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
  formClassName: PropTypes.string,
  onRegister: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
