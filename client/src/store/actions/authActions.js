// Action Types
import * as actionTypes from "./actionTypes";

// Utilities
import axios from "axios";
import decodeToken from "../../utils/decodeToken";
import setAuthToken from "../../utils/setAuthToken";
import actionDispatch from "../../utils/actionDispatch";

// Sets loading state
export const setAuthLoad = () => {
  return {
    type: actionTypes.SET_AUTH_LOAD,
  };
};

// Unsets loading state
export const unsetAuthLoad = () => {
  return {
    type: actionTypes.UNSET_AUTH_LOAD,
  };
};

// Sets a logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: decoded,
  };
};

// Updates current user
export const updateSetUser = (decoded) => {
  return {
    type: actionTypes.UPDATE_SET_USER,
    payload: decoded,
  };
};

/////////////////
// Public Routes

// @route   POST api/v1/users/register
// @desc    Register user
// @access  Public
export const register = (userData) => async (dispatch) => {
  try {
    await axios.post("/api/v1/users/register", userData);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   GET api/v1/users/login
// @desc    Login User / JWT Response => Sets LS and auth headers
// @access  Public
export const login = (userData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/v1/users/login", userData);
    const decoded = decodeToken(res.data.token);
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// Logout user => Removes JWT from LS and auth headers
export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

// @route   POST api/v1/users/sendPasswordResetToken
// @desc    Send email with a password reset token
// @access  Public
export const sendPasswordResetToken = (email) => async (dispatch) => {
  try {
    await axios.post("/api/v1/users/sendPasswordResetToken", email);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   PATCH api/v1/users/resetPassword/:resetToken
// @desc    Resets user password with token from email
// @access  Public
export const resetPassword = (passwordData, token) => async (dispatch) => {
  try {
    await axios.patch(`/api/v1/users/resetPassword/${token}`, passwordData);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

////////////////////
// Protected Routes

// @route   PATCH api/v1/users/updateCurrentUser
// @desc    Update current user's name, email, and pfp
// @access  Protected
export const updateCurrentUser = (userData) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/v1/users/updateCurrentUser`, userData);
    const decoded = decodeToken(res.data.token);
    dispatch(setCurrentUser(decoded));
    actionDispatch(actionTypes.UPDATE_USER, decoded, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   PATCH api/v1/users/updatePassword
// @desc    Update current user's password
// @access  Private
export const updatePassword = (passwordData) => async (dispatch) => {
  try {
    await axios.patch("/api/v1/users/updatePassword", passwordData);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};