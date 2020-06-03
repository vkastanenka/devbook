// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import {
  createUserProfile,
  updateCurrentUserProfile,
} from "../../store/actions/profileActions";

// Components
import InputGroup from "../Inputs/InputGroup";
import SelectGroup from "../Inputs/SelectGroup";
import TextAreaGroup from "../Inputs/TextAreaGroup";

class UpdateProfile extends Component {
  render() {
    return <div></div>;
  }
}

const mapStateToProps = state => ({
  users: state.users
})

export default UpdateProfile;
