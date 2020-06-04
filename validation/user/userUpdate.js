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
  if (Validator.isEmpty(data.registerHandle)) {
    errors.registerHandle = "Handle is required";
  } else if (!Validator.isLength(data.registerHandle, { min: 5 })) {
    errors.registerHandle = "Handle must be at least 5 characters";
  } else if (!Validator.isLength(data.registerHandle, { max: 12 })) {
    errors.registerHandle = "Handle must be at most 12 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
