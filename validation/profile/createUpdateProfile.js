const Validator = require("validator");
const isEmpty = require("../../utils/isEmpty");

module.exports = validateProfile = (data) => {
  const errors = {};

  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  // Developer status
  if (Validator.isEmpty(data.status)) {
    errors.status = "Developer status is required";
  } else if (
    data.status !== "Developer" ||
    data.status !== "Junior Developer" ||
    data.status !== "Senior Developer" ||
    data.status !== "Manager" ||
    data.status !== "Student or Learning" ||
    data.status !== "Instructor or Teacher" ||
    data.status !== "Intern" ||
    data.status !== "Other"
  ) {
    errors.status = "Invalid developer status";
  }

  // Developer skills
  if (data.skills.split(", ").length !== 5) {
    errors.skills = "5 developer skills or languages are required";
  }

  // Bio
  if (data.bio && data.bio.length > 300) {
    errors.bio = "Bio has a 300 character limit";
  }

  // Social media links

  // Youtube
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) errors.youtube = "URL is not valid";
  }

  // Twitter
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) errors.twitter = "URL is not valid";
  }

  // Facebook
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) errors.facebook = "URL is not valid";
  }

  // Linkedin
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) errors.linkedin = "URL is not valid";
  }

  // Instagram
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) errors.instagram = "URL is not valid";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};