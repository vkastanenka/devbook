// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { clearErrors } from "../../../../../store/actions/errorActions";
import { deleteExperience } from "../../../../../store/actions/profileActions";

// Utils
import {
  willReceiveAsyncErrors,
  clearErrorsOnUnmount,
} from "../../../../../utils/formUtils";
import { MMDDYYYY } from "../../../../../utils/dates";

// Components
import Icon from "../../../../../components/Icon/Icon";

// Experience from user's profile
class Experience extends Component {
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
    await this.props.deleteExperience(id);
  };

  render() {
    const authUser = this.props.auth.user;
    const { user } = this.props.users.user;
    let content, experienceEntries, fromDate, toDate;

    if (!user.profile) {
      return (
        <div className="content-card__content--user-info flex flex--abs-center">
          <p className="text-primary content-card__no-info">
            This user has not yet created their developer profile
          </p>
        </div>
      );
    } else if (user.profile) {
      const { experience } = this.props.users.user.user.profile;
      if (experience.length === 0) {
        content = (
          <div className="content-card__content--user-info flex flex--abs-center">
            <p className="text-primary">
              This user has not yet added any experience to their profile
            </p>
          </div>
        );
      } else if (experience.length > 0) {
        experienceEntries = experience.map((exp) => {
          fromDate = MMDDYYYY(exp.from);
          !exp.current ? (toDate = MMDDYYYY(exp.to)) : (toDate = "Now");

          return (
            <li key={exp._id} className="content-card__list-entry">
              {authUser._id === user._id ? (
                <Icon
                  type="cross"
                  className="icon icon--white-primary icon--medium content-card__close-icon icon--active icon--translate"
                  onClick={() => {
                    this.onDeleteClick(exp._id);
                  }}
                />
              ) : null}
              <h3 className="heading-tertiary">{exp.title}</h3>
              <p className="text-primary">{`${fromDate} - ${toDate}`}</p>
              <p className="text-primary">
                <span className="fw-medium">Company:</span> {exp.company}
              </p>
              <p className="text-primary">
                <span className="fw-medium">Location:</span> {exp.location}
              </p>
              <p className="text-primary">
                <span className="fw-medium">Description:</span>{" "}
                {exp.description}
              </p>
            </li>
          );
        });

        content = (
          <div className="content-card__content content-card__content--user-info">
            <ul className="content-card__list">{experienceEntries}</ul>
          </div>
        );
      }

      return content;
    }
  }
}

Experience.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  clearErrors,
  deleteExperience,
})(Experience);
