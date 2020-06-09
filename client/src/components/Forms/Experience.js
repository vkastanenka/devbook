// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { clearErrors } from "../../store/actions/errorActions";
import { addExperience } from "../../store/actions/profileActions";
import {
  willReceiveErrors,
  clearErrorsOnUnmount,
  prepareRequest,
  finishRequest,
  buttonText,
} from "../../utils/formUtils";

// Components
import Form from "../HigherOrder/Form";
import InputGroup from "../Inputs/InputGroup";
import TextAreaGroup from "../Inputs/TextAreaGroup";

// Form to add experience to profile
class Experience extends Component {
  state = {
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
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

  // Make a post request to add experience to user's profile
  onAddExperience = async (e) => {
    // Clear errors and notify user of request
    prepareRequest(e, this);

    // Data to post
    const experienceData = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    };

    // POST request
    await this.props.addExperience(experienceData);

    // Clear fields if no errors
    if (Object.keys(this.state.errors).length === 0) {
      this.setState({
        title: "",
        company: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: "",
      });
    }

    // Let user know it was a success
    finishRequest(this);
  };

  render() {
    const { errors, submitting, submitted, disableSubmitButton } = this.state;

    return (
      <Form
        submitFunction={this.onAddExperience}
        formClassName="content-card__content content-card__content--credentials pd-y-sm"
      >
        <InputGroup
          type="text"
          name="title"
          id="title"
          value={this.state.title}
          errors={errors.title}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="title"
          placeholder="Position title"
          label="Position title"
        />
        <InputGroup
          type="text"
          name="company"
          id="company"
          value={this.state.company}
          errors={errors.company}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="company"
          label="Company"
          placeholder="Company"
        />
        <InputGroup
          type="text"
          name="location"
          id="location"
          value={this.state.location}
          errors={errors.location}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="location"
          label="Company location"
          placeholder="Company location"
        />
        <InputGroup
          type="date"
          name="from"
          id="from"
          value={this.state.from}
          errors={errors.from}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="from"
          label="Start date"
          placeholder="Start date"
        />
        <InputGroup
          type="date"
          name="to"
          id="to"
          value={this.state.to}
          errors={errors.to}
          required={false}
          onChange={(e) => this.onChange(e)}
          htmlFor="to"
          label="End date"
          placeholder="End date"
        />
        <InputGroup
          type="checkbox"
          name="current"
          id="current"
          errors={errors.current}
          required={false}
          onChange={() =>
            this.setState((prevState) => ({ current: !prevState.current }))
          }
          htmlFor="current"
          label="Currently enrolled"
          placeholder="Currently enrolled"
        />
        <TextAreaGroup
          name="description"
          id="description"
          inputClass="form__textarea"
          placeholder="Description"
          value={this.state.description}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="description"
          label="Description"
          errors={errors.description}
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
              "Add experience",
              "Adding experience...",
              "Added experience!"
            )}
          </button>
        </div>
      </Form>
    );
  }
}

Experience.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  addExperience: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { clearErrors, addExperience })(
  Experience
);
