// Set the errors in the class's state
export const willReceiveErrors = (currentClass, state, props, nextProps) => {
  if (state.submitting && Object.keys(nextProps.errors).length > 0) {
    currentClass.setState({
      errors: nextProps.errors,
      submitting: false,
      disableSubmitButton: false,
    });

    currentClass.timer = setTimeout(() => {
      props.clearErrors();
      clearTimeout(currentClass.timer);
    }, 6000);
  }

  // Clear errors from state when global errors cleared
  if (
    Object.keys(state.errors).length > 0 &&
    Object.keys(nextProps.errors).length === 0
  ) {
    clearTimeout(currentClass.timer);
    currentClass.setState({ errors: {} });
  }
};

export const clearErrorsOnUnmount = (currentClass, props) => {
  clearTimeout(currentClass.timer);
  if (Object.keys(props.errors).length > 0) {
    props.clearErrors();
  }
}