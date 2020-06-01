// Utilities
const sharp = require("sharp");
const multer = require("multer");
const factory = require("./handlerFactory");
const filterObj = require("../utils/filterObj");
const createJWT = require("../utils/jwtGenerator");

// Error Handling
const catchAsync = require("./../utils/catchAsync");

// Validation
const validateUserUpdate = require("../validation/user/userUpdate");

// Models
const User = require("../models/userModel");

/////////////
// Middleware

// Store the file in memory as a Buffer object
const multerStorage = multer.memoryStorage();

// Test if the file is an image
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ error: "Not an image! Please upload only images..." }, false);
  }
};

// Configuring multer upload
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Accept a single file with the name 'photo' => File stored in req.file
exports.uploadUserPhoto = upload.single("photo");

// Image processing (resizing, formatting, quality, and file location)
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  // Need to define filename property to save to database
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  // Processing the uploaded image
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`client/src/assets/img/users/${req.file.filename}`);

  next();
});

////////////////
// Public Routes

// @route   GET api/v1/users/test
// @desc    Tests users route
// @access  Public
exports.test = (req, res, next) => {
  res.json({ message: "Users route secured" });
};

// @route   GET api/v1/users
// @desc    Returns all registered users
// @access  Public
exports.getAllUsers = factory.getAll(User);

// @route   GET api/v1/users/users/:id
// @desc    Returns users matching id parameter
// @access  Public
exports.getUserById = factory.getOne(User);

// @route   GET api/v1/users/handle/:handle
// @desc    Returns user by handle
// @access  Public
exports.getUserByHandle = catchAsync(async (req, res, next) => {
  // Find user
  const user = await User.findOne({
    handle: req.params.handle,
  }).populate([
    { path: "profile" },
    { path: "following", select: "photo name handle" },
  ]);

  // Respond if no user is found
  query404(user, res, "There is no user with that handle");

  // Respond
  res.status(200).json(user);
});

///////////////////
// Protected Routes

// @route   GET api/v1/users/currentUser
// @desc    Returns user associated with JWT
// @access  Protected
exports.getCurrentUser = (req, res, next) => {
  res.status(200).json({ status: "success", user: req.user });
};

// @route   PATCH api/v1/users/updateCurrentUser
// @desc    Update current user's email, name, and handle
// @access  Protected
exports.updateCurrentUser = catchAsync(async (req, res, next) => {
  // Validate inputs
  const { errors, isValid } = validateUserUpdate(req.body);
  if (!isValid) return res.status(400).json(errors);

  // Check if handle has been taken by another user
  const handleCheck = await User.findOne({ handle: req.body.handle });
  if (handleCheck && handleCheck._id.toString() !== req.user._id.toString()) {
    errors.handle = "Handle is already taken";
    return res.status(400).json(errors);
  }

  // Respond with an error if the user tries to update their password
  if (req.body.password || req.body.passwordConfirm) {
    errors.noPassword =
      'This route is not for password updates. Please use /updatePassword"';
    return res.status(400).json(errors);
  }

  // Filter the user's request for only name and email fields
  const filteredBody = filterObj(req.body, "email", "name", "handle");

  // Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  // Create the JWT
  const token = createJWT(updatedUser);

  // Respond
  res.status(200).json({
    status: "success",
    user: updatedUser,
    token,
  });
});

// @route   PATCH api/v1/users/updateCurrentUserPhoto
// @desc    Update current user's photo
// @access  Protected
exports.updateCurrentUserPhoto = catchAsync(async (req, res, next) => {
  if (req.file) {
    // Update user
    const photoName = req.file.filename;
    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { photo: photoName }
    );

    // Send updated JWT
    const token = createJWT(user);
    return res.status(200).json({ photoName, token });
  }

  // Error handling
  const errors = {};
  errors.nophoto = "Please upload a photo!";
  return res.status(400).json(errors);
});

// @route   POST api/v1/users/follow/:id
// @desc    Follows user by their id
// @access  Protected
exports.followById = catchAsync(async (req, res, next) => {
  const errors = {};

  // Prevent user from following themselves
  if (req.params.id === req.user.id) {
    errors.selfFollow = "You cannot follow yourself";
    return res.status(401).json(errors);
  }

  // Find user to follow
  const userToFollow = await User.findOne({ _id: req.params.id });

  // Error handling for no users found
  query404(userToFollow, res, "There is no user with that ID");

  // Find current user document to add follow to
  const user = await User.findOne({ _id: req.user.id });

  // Prevent user from following the same person twice
  const followCheck = user.following.indexOf(req.params.id);
  if (followCheck > -1) {
    errors.alreadyFollow = "You are already following this user";
    return res.status(401).json(errors);
  }

  // Add the user id to the current user's document
  user.following.unshift(userToFollow._id);

  // Save and respond
  await user.save({ validateBeforeSave: false });

  // Create updated JWT with new follower
  const token = createJWT(user);

  // Respond
  res.status(200).json({ status: "success", user, token });
});

// @route   DELETE api/v1/users/follow/:id
// @desc    Unfollows user by their id
// @access  Protected
exports.unfollowById = catchAsync(async (req, res, next) => {
  const errors = {};

  // Find current user document to remove follow from
  const user = await User.findOne({ _id: req.user.id });

  // Find the index of the user the current user wants to unfollow
  const removalIndex = user.following.indexOf(req.params.id);

  // Prevent user from unfollowing the same person twice
  if (removalIndex < 0) {
    errors.notFollow = "You do not yet follow this user";
    return res.status(401).json(errors);
  }

  // Remove the user id to the current user's document
  user.following.splice(removalIndex, 1);

  // Save
  await user.save({ validateBeforeSave: false });

  // Create updated JWT without follower
  const token = createJWT(user);

  // Respond
  res.status(200).json({ status: "success", user, token });
});

/////////////////////
// Restricted Routes

// @route   PATCH api/v1/users/user/:id
// @desc    Update user by their id
// @access  Restricted
exports.updateUserById = factory.updateOne(User);

// @route   DELETE api/v1/users/user/:id
// @desc    Delete user by their id
// @access  Restricted
exports.deleteUserById = factory.deleteOne(User);
