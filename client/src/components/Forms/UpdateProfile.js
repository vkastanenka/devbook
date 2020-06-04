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
  prepareRequest,
  finishRequest,
  buttonText,
} from "../../utils/formUtils";

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
    submitted: false,
    disableSubmitButton: false,
    errors: {},
  };

  componentDidMount() {
    if (!this.props.new) {
      const { profile } = this.props.auth.user.user;
      const { social } = profile;

      const socialURLs = Object.keys(social);
      const socialCheck = socialURLs.filter((url) => url !== "");

      this.setState({
        status: profile.status,
        skills: profile.skills.join(", "),
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: social.twitter,
        facebook: social.facebook,
        linkedin: social.linkedin,
        youtube: social.youtube,
        displaySocialMediaInputs: socialCheck.length > 0 ? true : false,
      });
    }
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

  // Make a post/patch request to create/update current user's profile
  onProfileUpdate = async (e) => {
    // Clear errors and notify user of request
    prepareRequest(e, this);

    // Profile data to post
    const profileData = {
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio,
      githubusername: this.state.githubusername,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
    };

    // POST / PATCH request
    this.props.new
      ? await this.props.createCurrentUserProfile(profileData)
      : await this.props.updateCurrentUserProfile(profileData);

    // Let user know it was a success
    finishRequest(this);
  };

  render() {
    const {
      errors,
      submitting,
      submitted,
      disableSubmitButton,
      displaySocialMediaInputs,
    } = this.state;

    return (
      <form
        className="form content-card__content"
        onSubmit={this.onProfileUpdate}
      >
        <h3 className="text-primary font-megrim pd-y-sm">
          * denotes required fields
        </h3>
        <SelectGroup
          name="status"
          options={[
            {
              value: "",
              label: "* Developer status",
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
          label="* Developer status"
          errors={errors.status}
        />
        <InputGroup
          type="text"
          name="skills"
          id="skills"
          placeholder="* 5 comma separated skills (HTML, CSS, JS, etc...)"
          value={this.state.skills}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="skills"
          label="* Developer skills"
          errors={errors.skills}
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
          label="Bio"
          errors={errors.bio}
        />
        <div className="form__group flex flex__center">
          <button
            className="btn-text mg-y-sm"
            type="button"
            onClick={() =>
              this.setState((prevState) => ({
                displaySocialMediaInputs: !prevState.displaySocialMediaInputs,
              }))
            }
          >
            {!displaySocialMediaInputs
              ? "Add social media links"
              : "Hide social media links"}
          </button>
        </div>
        {this.state.displaySocialMediaInputs ? (
          <Auxiliary>
            <InputGroup
              type="text"
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
              type="text"
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
              type="text"
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
              type="text"
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
              type="text"
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
          className="btn btn--primary ma-bt-sm"
          type="submit"
          disabled={disableSubmitButton}
        >
          {buttonText(
            submitting,
            submitted,
            "Submit profile",
            "Submitting profile...",
            "Submitted profile!"
          )}
        </button>
      </form>
    );
  }
}

UpdateProfile.propTypes = {
  new: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createCurrentUserProfile: PropTypes.func.isRequired,
  updateCurrentUserProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  createCurrentUserProfile,
  updateCurrentUserProfile,
})(UpdateProfile);
