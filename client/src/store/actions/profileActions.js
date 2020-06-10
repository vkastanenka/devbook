// Action Types
import * as actionTypes from "./actionTypes";

// Utilities
import axios from "axios";
import decodeToken from "../../utils/decodeToken";
import actionDispatch from "../../utils/actionDispatch";

// Actions
import { updateSetUser } from "./authActions";

// Sets loading state
export const setUserLoad = () => {
  return {
    type: actionTypes.SET_USER_LOAD,
  };
};

// Unsets loading state
export const unsetUserLoad = () => {
  return {
    type: actionTypes.UNSET_USER_LOAD,
  };
};

// @route   POST api/v1/profiles/currentUser
// @desc    Create current user's profile
// @access  Protected
export const createCurrentUserProfile = (profileData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/v1/profiles/currentUser", profileData);
    const decoded = decodeToken(res.data.token);
    dispatch(updateSetUser(decoded));
    actionDispatch(actionTypes.UPDATE_PROFILE, decoded, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   PATCH api/v1/profiles/currentUser
// @desc    Update current user's profile
// @access  Protected
export const updateCurrentUserProfile = (profileData) => async (dispatch) => {
  try {
    const res = await axios.patch("/api/v1/profiles/currentUser", profileData);
    const decoded = decodeToken(res.data.token);
    dispatch(updateSetUser(decoded));
    actionDispatch(actionTypes.UPDATE_PROFILE, decoded, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   POST api/v1/profiles/education
// @desc    Add education to profile
// @access  Protected
export const addEducation = eduData => async dispatch => {
  try {
    const res = await axios.post('/api/v1/profiles/education', eduData);
    actionDispatch(actionTypes.UPDATE_EDUCATION, res.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
}

// @route   DELETE api/v1/profiles/education/:id
// @desc    Delete education from profile
// @access  Protected
export const deleteEducation = eduId => async dispatch => {
  try {
    const res = await axios.delete(`/api/v1/profiles/education/${eduId}`);
    actionDispatch(actionTypes.UPDATE_EDUCATION, res.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
}

// @route   POST api/v1/profiles/experience
// @desc    Add experience to profile
// @access  Protected
export const addExperience = expData => async dispatch => {
  try {
    const res = await axios.post('/api/v1/profiles/experience', expData);
    actionDispatch(actionTypes.UPDATE_EXPERIENCE, res.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
}

// @route   DELETE api/v1/profiles/experience/:id
// @desc    Delete experience from profile
// @access  Protected
export const deleteExperience = expId => async dispatch => {
  try {
    const res = await axios.delete(`/api/v1/profiles/experience/${expId}`);
    actionDispatch(actionTypes.UPDATE_EXPERIENCE, res.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
}