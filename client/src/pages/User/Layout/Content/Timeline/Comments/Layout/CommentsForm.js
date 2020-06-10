// TODO: FINISHED

// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { createComment } from "../../../../../../../store/actions/postActions";
import { clearErrors } from "../../../../../../../store/actions/errorActions";
import {
  willReceiveErrors,
  clearErrorsOnUnmount,
  prepareRequest,
  finishRequest,
  buttonText,
} from "../../../../../../../utils/formUtils";

// Components
import Form from '../../../../../../../components/HigherOrder/Form';
import TextAreaGroup from '../../../../../../../components/Inputs/TextAreaGroup';

// Form to submit a new comment to a post
class CommentsForm extends Component {
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

  // Make a post request to add a comment to a post
  onCreateComment = async (e) => {
    // Clear errors and notify user of request
    prepareRequest(e, this);

    // POST request
    await this.props.createComment(this.props.postId, { text: this.state.text });

    if (Object.keys(this.state.errors).length === 0) {
      this.setState({ text: "" });
    }

    // Let user know it was a success
    finishRequest(this);
  };

  render() {
    const { submitting, submitted, disableSubmitButton } = this.state;
    return (
      <Form
        submitFunction={this.onCreateComment}
        formClassName="timeline__form"
      >
        <TextAreaGroup
          name="text"
          id="text"
          placeholder="Reply to this post"
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

CommentsForm.propTypes = {
  postId: PropTypes.string.isRequired,
  createComment: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createComment, clearErrors })(
  CommentsForm
);
