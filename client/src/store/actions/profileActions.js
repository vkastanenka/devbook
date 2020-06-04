// Action Types
import * as actionTypes from "./actionTypes";

// Utilities
import axios from "axios";
import decodeToken from "../../utils/decodeToken";
import actionDispatch from "../../utils/actionDispatch";

// Actions
import { setCurrentUser } from "./authActions";

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
    dispatch(setCurrentUser(decoded));
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
    console.log(decoded);
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};
