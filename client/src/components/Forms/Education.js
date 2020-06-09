// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { clearErrors } from "../../store/actions/errorActions";
import { addEducation } from "../../store/actions/profileActions";
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

// Form to add education to profile
class Education extends Component {
  state = {
    school: "",
    degree: "",
    fieldofstudy: "",
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

  // Make a post request to add education to user's profile
  onAddEducation = async (e) => {
    // Clear errors and notify user of request
    prepareRequest(e, this);

    // Data to post
    const educationData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    };

    // POST request
    await this.props.addEducation(educationData);

    // Clear fields if no errors
    if (Object.keys(this.state.errors).length === 0) {
      this.setState({
        school: "",
        degree: "",
        fieldofstudy: "",
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
        submitFunction={this.onAddEducation}
        formClassName="content-card__content content-card__content--credentials pd-y-sm"
      >
        <InputGroup
          type="text"
          name="school"
          id="school"
          placeholder="School"
          value={this.state.school}
          errors={errors.school}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="school"
          label="School"
        />
        <InputGroup
          type="text"
          name="degree"
          id="degree"
          value={this.state.degree}
          errors={errors.degree}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="degree"
          label="Degree"
          placeholder="Degree"
        />
        <InputGroup
          type="text"
          name="fieldofstudy"
          id="fieldofstudy"
          value={this.state.fieldofstudy}
          errors={errors.fieldofstudy}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="fieldofstudy"
          label="Field of study"
          placeholder="Field of study"
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
              "Add education",
              "Adding education...",
              "Added education!"
            )}
          </button>
        </div>
      </Form>
    );
  }
}

Education.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  addEducation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { clearErrors, addEducation })(
  Education
);
