// FINISHED

const Validator = require("validator");
const isEmpty = require("../../utils/isEmpty");

// Logging a user in
module.exports = validateLogin = (data) => {
  const errors = {};

  data.loginEmail = !isEmpty(data.loginEmail) ? data.loginEmail : "";
  data.loginPassword = !isEmpty(data.loginPassword) ? data.loginPassword : "";

  // Email
  if (Validator.isEmpty(data.loginEmail)) {
    errors.loginEmail = "Email field is required";
  } else if (!Validator.isEmail(data.loginEmail)) {
    errors.loginEmail = "Email is not valid";
  }

  // Password
  if (Validator.isEmpty(data.loginPassword)) {
    errors.loginPassword = "Password field is required";
  } else if (!Validator.isLength(data.loginPassword, { min: 8 })) {
    errors.loginPassword = "Password must be at least 8 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
