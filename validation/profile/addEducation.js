const Validator = require("validator");
const isEmpty = require("../../utils/isEmpty");

module.exports = validateEducation = (data) => {
  const errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  // School
  if (Validator.isEmpty(data.school)) {
    errors.school = "School name is required";
  }

  // Degree
  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree name is required";
  }

  // Field of study
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study is required";
  }

  // Start date
  if (Validator.isEmpty(data.from)) {
    errors.from = "Start date is required";
  }

  // End date
  if (Validator.isEmpty(data.to) && !data.current) {
    errors.to = "If not currently enrolled, end date is required";
  }

  // Description
  if (Validator.isEmpty(data.description)) {
    errors.description =
      "Education description is required (max 300 characters)";
  } else if (data.description.length > 300) {
    errors.description = "Description has a 300 character limit";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
