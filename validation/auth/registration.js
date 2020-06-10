// FINISHED

const Validator = require("validator");
const isEmpty = require("../../utils/isEmpty");

// Registering a new user
module.exports = validateRegistration = (data) => {
  const errors = {};

  data.registerEmail = !isEmpty(data.registerEmail) ? data.registerEmail : "";
  data.registerName = !isEmpty(data.registerName) ? data.registerName : "";
  data.registerHandle = !isEmpty(data.registerHandle) ? data.registerHandle : "";
  data.registerPassword = !isEmpty(data.registerPassword)
    ? data.registerPassword
    : "";
  data.registerPasswordConfirm = !isEmpty(data.registerPasswordConfirm)
    ? data.registerPasswordConfirm
    : "";

  // Email
  if (Validator.isEmpty(data.registerEmail)) {
    errors.registerEmail = "Email field is required";
  } else if (!Validator.isEmail(data.registerEmail)) {
    errors.registerEmail = "Email is not valid";
  }

  // Name
  if (Validator.isEmpty(data.registerName)) {
    errors.registerName = "Name field is required";
  } else if (
    data.registerName.split(" ").length < 2 ||
    data.registerName.split(" ").length > 3
  ) {
    errors.registerName = "Full name is required";
  }

  // Handle
  if (Validator.isEmpty(data.registerHandle)) {
    errors.registerHandle = "Handle is required";
  } else if (!Validator.isLength(data.registerHandle, { min: 5 })) {
    errors.registerHandle = "Handle must be at least 5 characters";
  } else if (!Validator.isLength(data.registerHandle, { max: 12 })) {
    errors.registerHandle = "Handle must be at most 12 characters";
  }

  // Password
  if (Validator.isEmpty(data.registerPassword)) {
    errors.registerPassword = "Password field is required";
  } else if (!Validator.isLength(data.registerPassword, { min: 8 })) {
    errors.registerPassword = "Password must be at least 8 characters";
  }

  // Password confirm
  if (Validator.isEmpty(data.registerPasswordConfirm)) {
    errors.registerPasswordConfirm = "Confirm password field is required";
  } else if (
    !Validator.equals(data.registerPassword, data.registerPasswordConfirm)
  )
    errors.registerPasswordConfirm = "Both passwords must match";

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
