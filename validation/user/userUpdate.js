const Validator = require("validator");
const isEmpty = require("../../utils/isEmpty");

// Updating user information
module.exports = validateUserUpdate = (data) => {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.handle = !isEmpty(data.handle) ? data.handle : "";

  // Email
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }

  // Name
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  } else if (
    data.name.split(" ").length < 2 ||
    data.name.split(" ").length > 3
  ) {
    errors.name = "Full name is required";
  }

  // Handle
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
