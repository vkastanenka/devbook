
// Action Types
import * as actionTypes from "../actions/actionTypes";

// Utilities
import isEmpty from "../../utils/is-empty";
import updateObject from "../../utils/updateObject";

const initialState = {
  user: null,
  isAuth: false,
  loading: false,
};

// Sets loading state
const setAuthLoad = (state, action) => {
  return updateObject(state, { loading: true });
};

// Unsets loading state
const unsetAuthLoad = (state, action) => {
  return updateObject(state, { loading: false });
};

// Shows if user is authenticated and assigns data from JWT
const setCurrentUser = (state, action) => {
  return updateObject(state, {
    isAuth: !isEmpty(action.payload),
    user: action.payload,
  });
};

// Updates user data with a new JWT
const updateSetUser = (state, action) => {
  return updateObject(state, { user: action.payload });
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_AUTH_LOAD:
      return setAuthLoad(state, action);
    case actionTypes.UNSET_AUTH_LOAD:
      return unsetAuthLoad(state, action);
    case actionTypes.SET_CURRENT_USER:
      return setCurrentUser(state, action);
    case actionTypes.UPDATE_SET_USER:
      return updateSetUser(state, action);
    default:
      return state;
  }
}
