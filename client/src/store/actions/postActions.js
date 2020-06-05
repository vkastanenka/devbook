import * as actionTypes from './actionTypes';

// Utilities
import axios from 'axios';
import actionDispatch from "../../utils/actionDispatch";

// @route   POST api/v1/posts/currentUser
// @desc    Create post for current user
// @access  Protected
export const createPost = (post) => async (dispatch) => {
  try {
    const res = await axios.post("/api/v1/posts/currentUser", post);
    actionDispatch(actionTypes.CREATE_POST, res.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};