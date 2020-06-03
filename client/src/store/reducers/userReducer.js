// Action Types
import * as actionTypes from "../actions/actionTypes";

// Utilities
import updateObject from "../../utils/updateObject";

const initialState = {
  user: null,
  users: null,
  loading: false,
};

// Sets loading state
const setUserLoad = (state, action) => {
  return updateObject(state, { loading: true });
};

// Unsets loading state
const unsetUserLoad = (state, action) => {
  return updateObject(state, { loading: false });
};

// Sets a searched user
const setSearchedUser = (state, action) => {
  return updateObject(state, {
    user: action.payload,
    loading: false,
  });
};

// Sets all users
const getUsers = (state, action) => {
  return updateObject(state, {
    users: action.payload,
    // loading: false,
  });
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_USER_LOAD:
      return setUserLoad(state, action);
    case actionTypes.UNSET_USER_LOAD:
      return unsetUserLoad(state, action);
    case actionTypes.GET_USER:
      return setSearchedUser(state, action);
    case actionTypes.GET_USERS:
      return getUsers(state, action);
    default:
      return state;
  }
}
