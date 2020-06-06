// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { clearErrors } from "../../../../../store/actions/errorActions";
import { deleteEducation } from "../../../../../store/actions/profileActions";

// Utils
import {
  willReceiveAsyncErrors,
  clearErrorsOnUnmount,
} from "../../../../../utils/formUtils";
import { MMDDYYYY } from "../../../../../utils/dates";

// Components
import Icon from "../../../../../components/Icon/Icon";

class Education extends Component {
  state = {
    errors: {},
  };

  timer = null;

  componentWillReceiveProps(nextProps) {
    willReceiveAsyncErrors(this, nextProps);
  }

  componentWillUnmount() {
    clearErrorsOnUnmount(this);
  }

  onDeleteClick = async (id) => {
    // Clear errors if any before submitting
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors();
    }

    // DELETE request
    await this.props.deleteEducation(id);
  };

  render() {
    const authUser = this.props.auth.user.user;
    const { user } = this.props.users.user;
    let content, educationEntries, fromDate, toDate;
    const education = this.props.users.user.user.profile.education;

    if (education.length === 0) {
      content = (
        <div className="content-card__content--user-info flex flex--abs-center">
          <p className="text-primary content-card__no-info">
            This user has not yet added any education to their profile
          </p>
        </div>
      );
    } else if (education.length > 0) {
      educationEntries = education.map((edu) => {
        fromDate = MMDDYYYY(edu.from);
        !edu.current ? (toDate = MMDDYYYY(edu.to)) : (toDate = "Now");

        return (
          <li key={edu._id} className="content-card__list-entry">
            {authUser._id === user._id ? (
              <Icon
                type="cross"
                className="icon icon--white-primary icon--medium content-card__close-icon icon--active icon--translate"
                onClick={() => {
                  this.onDeleteClick(edu._id);
                }}
              />
            ) : null}
            <h3 className="heading-tertiary">{edu.school}</h3>
            <p className="text-primary">{`${fromDate} - ${toDate}`}</p>
            <p className="text-primary">
              <span className="fw-medium">Degree:</span> {edu.degree}
            </p>
            <p className="text-primary">
              <span className="fw-medium">Field of Study:</span>{" "}
              {edu.fieldofstudy}
            </p>
            <p className="text-primary">
              <span className="fw-medium">Description:</span> {edu.description}
            </p>
          </li>
        );
      });

      content = (
        <div className="content-card__content content-card__content--user-info">
          <ul className="content-card__list">{educationEntries}</ul>
        </div>
      );
    }

    return content;
  }
}

Education.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  clearErrors,
  deleteEducation,
})(Education);
