// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { createPost } from "../../../../../../store/actions/postActions";
import { clearErrors } from "../../../../../../store/actions/errorActions";
import {
  willReceiveErrors,
  clearErrorsOnUnmount,
  prepareRequest,
  finishRequest,
  buttonText,
} from "../../../../../../utils/formUtils";

// Components
import Form from "../../../../../../components/HigherOrder/Form";
import TextAreaGroup from "../../../../../../components/Inputs/TextAreaGroup";

// Form to submit a new post the the user's timeline
class TimelineForm extends Component {
  state = {
    text: "",
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

  // Make a post request to add a post to the timeline
  onCreatePost = async (e) => {
    // Clear errors and notify user of request
    prepareRequest(e, this);

    // POST request
    await this.props.createPost({ text: this.state.text });

    if (Object.keys(this.state.errors).length === 0) {
      this.setState({ text: '' });
    }

    // Let user know it was a success
    finishRequest(this);
  };

  render() {
    const { submitting, submitted, disableSubmitButton } = this.state;
    return (
      <Form submitFunction={this.onCreatePost} formClassName='timeline__form ma-y-sm'>
        <TextAreaGroup
          name="text"
          id="text"
          placeholder="What's on your mind?"
          value={this.state.text}
          required={true}
          onChange={(e) => this.onChange(e)}
        />
        <button
          className="btn btn--ghost"
          type="submit"
          disabled={disableSubmitButton}
        >
          {buttonText(
            submitting,
            submitted,
            "Submit",
            "Submitting...",
            "Submitted!"
          )}
        </button>
      </Form>
    );
  }
}

TimelineForm.propTypes = {
  createPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createPost, clearErrors })(
  TimelineForm
);
