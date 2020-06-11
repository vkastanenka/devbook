export const willReceiveAsyncErrors = (currentClass, nextProps) => {
  // Set errors in class's state
  if (Object.keys(nextProps.errors).length > 0) {
    currentClass.setState({ errors: nextProps.errors });
  }

  currentClass.timer = setTimeout(() => {
    currentClass.props.clearErrors();
    clearTimeout(currentClass.timer);
  }, 6000);

  // Clear errors from state when global errors cleared
  if (
    Object.keys(currentClass.state.errors).length > 0 &&
    Object.keys(nextProps.errors).length === 0
  ) {
    clearTimeout(currentClass.timer);
    currentClass.setState({ errors: {} });
  }
};

// Set the errors in the class's state
export const willReceiveErrors = (currentClass, nextProps) => {
  if (
    currentClass.state.submitting &&
    Object.keys(nextProps.errors).length > 0
  ) {
    currentClass.setState({
      errors: nextProps.errors,
      submitting: false,
      disableSubmitButton: false,
    });

    currentClass.timer = setTimeout(() => {
      currentClass.props.clearErrors();
      clearTimeout(currentClass.timer);
    }, 6000);
  }

  // Clear errors from state when global errors cleared
  if (
    Object.keys(currentClass.state.errors).length > 0 &&
    Object.keys(nextProps.errors).length === 0
  ) {
    clearTimeout(currentClass.timer);
    currentClass.setState({ errors: {} });
  }
};

export const clearErrorsOnUnmount = (currentClass) => {
  clearTimeout(currentClass.timer);
  if (Object.keys(currentClass.props.errors).length > 0) {
    currentClass.props.clearErrors();
    currentClass.setState({ errors: {} });
  }
};

export const prepareRequest = (e, currentClass) => {
  e.preventDefault();

  // Clear errors if any before submitting
  if (Object.keys(currentClass.props.errors).length > 0) {
    currentClass.props.clearErrors();
  }

  // Let user know request is happening and disable button
  currentClass.setState({ submitting: true, disableSubmitButton: true });
};

export const finishRequest = (currentObject) => {
  // Let user know request was a success
  if (Object.keys(currentObject.state.errors).length === 0) {
    currentObject.setState({
      submitting: false,
      disableSubmitButton: false,
      submitted: true,
    });

    // Clear success message after 6 seconds
    currentObject.timer = setTimeout(() => {
      currentObject.setState({ submitted: false });
      clearTimeout(currentObject.timer);
    }, 6000);
  }
};

// Changes button text based on request process
export const buttonText = (
  submitting,
  submitted,
  normalText,
  submittingText,
  submittedText
) => {
  let buttonText;
  if (!submitting && !submitted) buttonText = normalText;
  else if (submitting && !submitted) buttonText = submittingText;
  else if (!submitting && submitted) buttonText = submittedText;
  return buttonText;
};
