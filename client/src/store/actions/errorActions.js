// Action Types
import * as actionTypes from "./actionTypes";

// Utilities
import actionDispatch from "../../utils/actionDispatch";

// Clear errors
export const clearErrors = () => dispatch => {
  actionDispatch(actionTypes.CLEAR_ERRORS, {}, dispatch);
}