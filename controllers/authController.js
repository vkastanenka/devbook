// Utilities
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Email = require("../utils/email");
const createJWT = require("../utils/jwtGenerator");

// Error Handling
const catchAsync = require("../utils/catchAsync.js");

// Validation
const validateLogin = require("../validation/auth/login");
const validateRegistration = require("../validation/auth/registration");
const validatePasswordReset = require("../validation/auth/passwordReset");
const validatePasswordUpdate = require("../validation/auth/passwordUpdate");

// Models
const User = require("../models/userModel");

//////////////
// Middleware

// Protecting routes for logged in users => Assigns req.user
exports.protect = catchAsync(async (req, res, next) => {
  const errors = {};

  // Assigning the token based on headers or localStorage
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (localStorage.jwtToken) {
    token = localStorage.jwtToken;
  }

  // Check if the token exists
  if (!token) {
    errors.noToken = "You are not logged in! Please log in to gain access.";
    return res.status(401).json(errors);
  }

  // Verify the token against its secret
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Find the user with the ID encoded in the JWT
  const currentUser = await User.findById(decoded._id);

  // Check if user still exists
  if (!currentUser) {
    errors.noUser = "The user related to this token no longer exists";
    return res.status(401).json(errors);
  }

  // Check if user changed password after the token was issued
  if (await currentUser.changedPasswordAfter(decoded.iat)) {
    errors.changedPassword =
      "User has recently changed their password! Please log in again!";
    return res.status(401).json(errors);
  }

  // Assign currentUser to req.user to be used in protected route functions
  req.user = currentUser;
  next();
});

// Restricts controller actions to specified roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    const errors = {};

    // If the user's role is not included in the argument, deny access
    if (!roles.includes(req.user.role)) {
      errors.unauthorized = "You do not have permission to perform this action";
      return res.status(403).json(errors);
    }

    next();
  };
};

/////////////////
// Public Routes

// @route   POST api/v1/users/register
// @desc    Register user
// @access  Public
exports.register = catchAsync(async (req, res, next) => {
  // Validate inputs
  const { errors, isValid } = validateRegistration(req.body);
  if (!isValid) return res.status(400).json(errors);

  // Check if email is already taken
  const userCheck = await User.findOne({ email: req.body.registerEmail });
  if (userCheck) {
    errors.registerEmail = "Email already taken";
    return res.status(400).json(errors);
  }

  // Check if handle is already taken
  const handleCheck = await User.findOne({ handle: req.body.registerHandle });
  if (handleCheck) {
    errors.registerHandle = "Handle is already taken";
    return res.status(400).json(errors);
  }

  // Create new user
  const newUser = await User.create({
    email: req.body.registerEmail,
    name: req.body.registerName,
    handle: req.body.registerHandle,
    password: req.body.registerPassword,
    passwordConfirm: req.body.registerPasswordConfirm,
  });

  // Respond
  res.status(201).json({ status: "success", newUser });
});

// @route   GET api/v1/users/login
// @desc    Login User / JWT Response
// @access  Public
exports.login = catchAsync(async (req, res, next) => {
  // Validate inputs
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) return res.status(400).json(errors);

  // Find user
  const { loginEmail, loginPassword } = req.body;

  // Find user
  const user = await User.findOne({ email: loginEmail })
    .select("+password")
    .populate([
      { path: "profile" },
    ]);

  // Check is either email or password are incorrect
  if (!user || !(await user.correctPassword(loginPassword, user.password))) {
    errors.loginEmail = "Email and/or password are incorrect";
    errors.loginPassword = "Email and/or password are incorrect";
    return res.status(400).json(errors);
  }

  // Create the JWT => Entire user document
  const token = createJWT(user);

  // Respond
  res.status(200).json({
    status: "success",
    token,
    user,
  });
});

// @route   POST api/v1/users/sendPasswordResetToken
// @desc    Send email with a password reset token
// @access  Public
exports.sendPasswordResetToken = catchAsync(async (req, res, next) => {
  const errors = {};

  // Check if there is an input for the user's email
  if (!req.body.email) {
    errors.passwordReset = "Please enter your email to send the token";
    return res.status(400).json(errors);
  }

  // Check if user associated to req.body.email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    errors.passwordReset =
      "There is no user associated with that email address";
    return res.status(400).json(errors);
  }

  // Generate the random password reset token
  const resetToken = user.createPasswordResetToken();

  // Save the password reset token expiration time in the user's document (10 min)
  await user.save({ validateBeforeSave: false });

  try {
    // Send an email with a link to a form to reset the user's password
    // const resetURL = `https://vkastanenka-devconnector.herokuapp.com/${resetToken}`;
    const resetURL = `http://localhost:3000/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();

    // Respond
    res.status(200).json({
      success: "Token sent to email!",
    });
  } catch (err) {
    // In case of an error, reset the fields in the user document
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    // Respond
    errors.server500 =
      "There was a problem sending the email, please try again later.";
    res.status(500).json(errors);
  }
});

// @route   PATCH api/v1/users/resetPassword/:resetToken
// @desc    Resets user password with token from email
// @access  Public
exports.resetPassword = catchAsync(async (req, res, next) => {
  // Validate inputs
  const { errors, isValid } = validatePasswordReset(req.body);
  if (!isValid) return res.status(400).json(errors);

  // Hash the reset token in the URL params in order to compare to passwordResetToken field assigned in the above forgotPassword function
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  // Find the user based on the above hashed token and whether or not that token's expiration has expired yet or not
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // Check if either the token is invalid or has expired
  if (!user) {
    errors.invalidToken = "Token is invalid or has expired";
    return res.status(400).json(errors);
  }

  // If token is valid and has not expired, set the new password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  // Save the user document
  await user.save();

  // Respond
  res.status(200).json({ success: "Password successfully updated!" });
});

//////////////////
// Private Routes

// @route   PATCH api/v1/users/updatePassword (DONE)
// @desc    Update current user's password
// @access  Private
exports.updatePassword = catchAsync(async (req, res, next) => {
  // Validate inputs
  const { errors, isValid } = validatePasswordUpdate(req.body);
  if (!isValid) return res.status(400).json(errors);

  // Find current user's document
  const user = await User.findById(req.user.id).select("+password");

  // Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    errors.currentPassword = "Current password is incorrect";
    return res.status(400).json(errors);
  }

  // If so, update user document's password
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;
  await user.save();

  // Respond
  res.status(200).json({ success: "Password successfully updated!" });
});
