// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import {
  createCurrentUserProfile,
  updateCurrentUserProfile,
} from "../../store/actions/profileActions";
import {
  willReceiveErrors,
  clearErrorsOnUnmount,
} from "../../utils/errorHandling";

// Components
import Auxiliary from "../HigherOrder/Auxiliary";
import InputGroup from "../Inputs/InputGroup";
import SelectGroup from "../Inputs/SelectGroup";
import TextAreaGroup from "../Inputs/TextAreaGroup";

class UpdateProfile extends Component {
  state = {
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    displaySocialMediaInputs: false,
    submitting: false,
    disableSubmitButton: false,
    submitted: false,
    errors: {},
  };

  // Binding timer to component instance
  timer = null;

  // Alerting user of errors / success / progress
  componentWillReceiveProps(nextProps) {
    willReceiveErrors(this, this.state, this.props, nextProps);
  }

  // Clear any timers when form unmounts
  componentWillUnmount() {
    clearErrorsOnUnmount(this, this.props);
  }

  // State handler for input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Make a post/patch request to create/update current user's profile
  onProfileUpdate = async (e) => {
    e.preventDefault();

    // Clear errors if any before submitting
    if (Object.keys(this.props.errors).length > 0) this.props.clearErrors();

    // Let user know request is happening and disable button
    this.setState({ submitting: true, disableSubmitButton: true });

    // User data to post
  };

  render() {
    let buttonText;
    const { errors, submitting, submitted, disableSubmitButton } = this.state;
    if (!submitting && !submitted) buttonText = "Submit profile";
    else if (submitting && !submitted) buttonText = "Submitting profile...";
    else if (!submitted && submitted) buttonText = "Submitted profile!";

    return (
      <form className="form" onSubmit={this.onProfileUpdate}>
        <h3 className="heading-tertiary">* denotes required fields</h3>
        <SelectGroup
          name="status"
          options={[
            {
              value: "",
              label: "Developer Status *",
              disabled: true,
              hidden: true,
            },
            { label: "Developer", value: "Developer" },
            { label: "Junior Developer", value: "Junior Developer" },
            { label: "Senior Developer", value: "Senior Developer" },
            { label: "Manager", value: "Manager" },
            { label: "Student or Learning", value: "Student or Learning" },
            { label: "Instructor or Teacher", value: "Instructor or Teacher" },
            { label: "Intern", value: "Intern" },
            { label: "Other", value: "Other" },
          ]}
          id="status"
          value={this.state.status}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="status"
          label="Developer status *"
          errors={errors.status}
        />
        <InputGroup
          type="text"
          name="skills"
          id="skills"
          placeholder="5 comma separated skills (HTML, CSS, JS, etc...) *"
          value={this.state.skills}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="skills"
          label="Developer skills *"
          errors={errors.registerName}
        />
        <InputGroup
          type="text"
          name="githubusername"
          id="githubusername"
          placeholder="Github username (displays repositories)"
          value={this.state.githubusername}
          required={false}
          onChange={(e) => this.onChange(e)}
          htmlFor="githubusername"
          label="Github username"
          errors={errors.githubusername}
        />
        <TextAreaGroup
          name="bio"
          id="bio"
          inputClass="form__textarea"
          placeholder="Provide a bio"
          value={this.state.bio}
          required={false}
          onChange={(e) => this.onChange(e)}
          htmlFor="bio"
          label="bio"
          errors={errors.bio}
        />
        <button
          className="btn-text"
          onClick={() =>
            this.setState((prevState) => ({
              displaySocialMediaInputs: !prevState.displaySocialMediaInputs,
              twitter: "",
              facebook: "",
              linkedin: "",
              youtube: "",
              instagram: "",
            }))
          }
        >
          Add social media links
        </button>
        {this.state.displaySocialMediaInputs ? (
          <Auxiliary>
            <InputGroup
              type="url"
              name="twitter"
              id="twitter"
              htmlFor="twitter"
              placeholder="Twitter"
              label="Twitter"
              value={this.state.twitter}
              required={false}
              onChange={(e) => this.onChange(e)}
              errors={errors.twitter}
            />
            <InputGroup
              type="url"
              name="facebook"
              id="facebook"
              htmlFor="facebook"
              value={this.state.facebook}
              errors={errors.facebook}
              placeholder="Facebook"
              label="Facebook"
              required={false}
              onChange={(e) => this.onChange(e)}
            />
            <InputGroup
              type="url"
              name="linkedin"
              id="linkedin"
              htmlFor="linkedin"
              value={this.state.linkedin}
              errors={errors.linkedin}
              placeholder="LinkedIn"
              label="LinkedIn"
              required={false}
              onChange={(e) => this.onChange(e)}
            />
            <InputGroup
              type="url"
              name="youtube"
              id="youtube"
              htmlFor="youtube"
              value={this.state.youtube}
              errors={errors.youtube}
              placeholder="Youtube"
              label="Youtube"
              required={false}
              onChange={(e) => this.onChange(e)}
            />
            <InputGroup
              type="url"
              name="instagram"
              id="instagram"
              htmlFor="instagram"
              value={this.state.instagram}
              errors={errors.instagram}
              placeholder="Instagram"
              label="Instagram"
              required={false}
              onChange={(e) => this.onChange(e)}
            />
          </Auxiliary>
        ) : null}
        <button
          className="btn btn--primary"
          type="submit"
          disabled={disableSubmitButton}
        >
          {buttonText}
        </button>
      </form>
    );
  }
}

UpdateProfile.propTypes = {
  new: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  createCurrentUserProfile: PropTypes.func.isRequired,
  updateCurrentUserProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, {
  createCurrentUserProfile,
  updateCurrentUserProfile,
})(UpdateProfile);
