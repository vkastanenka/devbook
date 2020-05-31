import * as actionTypes from "../actions/actionTypes";

const initialState = {};

// Any errors caught will be available
const getErrors = (state, action) => {
  const errors = {};
  if (typeof action.payload === "string") {
    errors.server500 = "Internal server error, please try again later!";
    return errors;
  }
  return action.payload;
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ERRORS:
      return getErrors(state, action);
    case actionTypes.CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
