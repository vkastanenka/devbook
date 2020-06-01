// Action Types
import * as actionTypes from "./actionTypes";

// Utilities
import axios from "axios";
import actionDispatch from "../../utils/actionDispatch";

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

// Clear user
export const clearUser = () => dispatch => {
  actionDispatch(actionTypes.CLEAR_USER, {}, dispatch);
}

/////////////////
// Public Routes

// @route   GET api/v1/users/handle/:handle
// @desc    Returns user by handle
// @access  Public
export const getUserByHandle = (handle) => async (dispatch) => {
  dispatch(setUserLoad());
  try {
    const res = await axios.get(`/api/v1/users/handle/${handle}`);
    actionDispatch(actionTypes.GET_USER, res.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
    dispatch(unsetUserLoad());
  }
};
