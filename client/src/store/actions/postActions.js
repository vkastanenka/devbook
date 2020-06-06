import * as actionTypes from "./actionTypes";

// Utilities
import axios from "axios";
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

// @route   DELETE api/v1/posts/currentUser/:id
// @desc    Delete post for current user by id
// @access  Protected
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/posts/currentUser/${id}`);
    actionDispatch(actionTypes.DELETE_POST, id, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   POST api/v1/posts/like/:id
// @desc    Like post by id
// @access  Protected
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/v1/posts/like/${id}`);
    actionDispatch(actionTypes.UPDATE_POST, res.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   DELETE api/v1/posts/like/:id
// @desc    Remove like from post
// @access  Protected
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/posts/like/${id}`);
    actionDispatch(actionTypes.UPDATE_POST, res.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   POST api/v1/posts/dislike/:id
// @desc    Dislike post
// @access  Protected
export const addDislike = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/v1/posts/dislike/${id}`);
    actionDispatch(actionTypes.UPDATE_POST, res.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   DELETE api/v1/posts/dislike/:id
// @desc    Remove dislike from post
// @access  Protected
export const removeDislike = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/posts/dislike/${id}`);
    actionDispatch(actionTypes.UPDATE_POST, res.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   POST api/v1/posts/comment/:id
// @desc    Add comment to post
// @access  Protected
export const createComment = (postId, comment) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/v1/posts/comment/${postId}`, comment);
    actionDispatch(actionTypes.UPDATE_POST, res.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   DELETE api/v1/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Protected
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/v1/posts/comment/${postId}/${commentId}`
    );
    actionDispatch(actionTypes.UPDATE_POST, res.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   POST api/v1/posts/likeComment/:id/:comment_id
// @desc    Like comment
// @access  Protected
export const addCommentLike = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.post(
      `/api/v1/posts/likeComment/${postId}/${commentId}`
    );
    actionDispatch(actionTypes.UPDATE_POST, res.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   DELETE api/v1/posts/likeComment/:id/:comment_id
// @desc    Remove like from comment
// @access  Protected
export const removeCommentLike = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/v1/posts/likeComment/${postId}/${commentId}`
    );
    actionDispatch(actionTypes.UPDATE_POST, res.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   POST api/v1/posts/dislikeComment/:id/:comment_id
// @desc    Dislike comment
// @access  Protected
export const addCommentDislike = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.post(
      `/api/v1/posts/dislikeComment/${postId}/${commentId}`
    );
    actionDispatch(actionTypes.UPDATE_POST, res.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};

// @route   DELETE api/v1/posts/dislikeComment/:id/:comment_id
// @desc    Remove dislike from comment
// @access  Protected
export const removeCommentDislike = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/v1/posts/dislikeComment/${postId}/${commentId}`
    );
    actionDispatch(actionTypes.UPDATE_POST, res.data, dispatch);
  } catch (err) {
    actionDispatch(actionTypes.GET_ERRORS, err.response.data, dispatch);
  }
};
