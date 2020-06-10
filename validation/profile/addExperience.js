const Validator = require("validator");
const isEmpty = require("../../utils/isEmpty");

module.exports = validateExperience = (data) => {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  // Title
  if (Validator.isEmpty(data.title)) {
    errors.title = "Job title is required";
  }

  // Company
  if (Validator.isEmpty(data.company)) {
    errors.company = "Company name is required";
  }

  // Start date
  if (Validator.isEmpty(data.from)) {
    errors.from = "Start date is required";
  }

  // End date
  if (Validator.isEmpty(data.to) && !data.current) {
    errors.to = "If not current position, end date is required";
  }

  // Location
  if (Validator.isEmpty(data.location)) {
    errors.location = "Position location is required";
  }

  // Description
  if (Validator.isEmpty(data.description)) {
    errors.description =
      "Position description is required (max 300 characters)";
  } else if (data.description.length > 300) {
    errors.description = "Description has a 300 character limit";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
