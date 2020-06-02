// Action Types
import * as actionTypes from "./actionTypes";

// Utilities
import axios from "axios";
import decodeToken from '../../utils/decodeToken';
import actionDispatch from "../../utils/actionDispatch";

// Actions
import { setCurrentUser } from './authActions';

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

// @route   PATCH api/v1/users/updateCurrentUserPhoto
// @desc    Update current user's photo
// @access  Protected
export const updateUserPhoto = (photo) => async (dispatch) => {
  try {
    const res = await axios.patch('/api/v1/users/updateCurrentUserPhoto', photo);
    const decoded = decodeToken(res.data.token);
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
}

// @route   POST api/v1/users/follow/:id
// @desc    Follows user by their id
// @access  Protected
export const followUser = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/v1/users/follow/${id}`);
    const decoded = decodeToken(res.data.token);
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   DELETE api/v1/users/follow/:id
// @desc    Unfollows user by their id
// @access  Protected
export const unfollowUser = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/users/follow/${id}`);
    const decoded = decodeToken(res.data.token);
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};