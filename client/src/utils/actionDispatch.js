// Dispatches action types with payload
export default (type, payload, dispatch) => {
  return dispatch({ type, payload });
};
