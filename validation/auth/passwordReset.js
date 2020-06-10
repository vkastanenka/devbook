// FINISHED

const Validator = require("validator");
const isEmpty = require("../../utils/isEmpty");

// Resetting a user's password
module.exports = validatePasswordReset = (data) => {
  const errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : "";

  // Password
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  } else if (!Validator.isLength(data.password, { min: 8 })) {
    errors.password = "Password must be at least 8 characters";
  }

  // Password confirm
  if (Validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = "Confirm password field is required";
  } else if (!Validator.equals(data.password, data.passwordConfirm))
    errors.passwordConfirm = "Both passwords must match";

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
