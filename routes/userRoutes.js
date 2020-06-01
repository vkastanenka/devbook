// Set up router
const express = require("express");
const router = express.Router();

// Load controllers
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

/////////////////
// Public Routes

// @route   GET api/v1/users
// @desc    Tests users route
// @access  Public
router.get("/test", userController.test);

// @route   GET api/v1/users
// @desc    Returns all registered users
// @access  Public
router.get("/", userController.getAllUsers);

// @route   GET api/v1/users/:id
// @desc    Returns users matching id parameter
// @access  Public
router.get("/user/:id", userController.getUserById);

// @route   GET api/v1/users/handle/:handle
// @desc    Returns user by handle
// @access  Public
router.get('/handle/:handle', userController.getUserByHandle);

// @route   POST api/v1/users/register
// @desc    Register user
// @access  Public
router.post("/register", authController.register);

// @route   GET api/v1/users/login
// @desc    Login User / JWT Response
// @access  Public
router.post("/login", authController.login);

// @route   POST api/v1/users/sendPasswordResetToken
// @desc    Send email with a password reset token
// @access  Public
router.post("/sendPasswordResetToken", authController.sendPasswordResetToken);

// @route   PATCH api/v1/users/resetPassword/:resetToken (DONE)
// @desc    Resets user password with token from email
// @access  Public
router.patch("/resetPassword/:resetToken", authController.resetPassword);

///////////////////
// Protected Routes

router.use(authController.protect);

// @route   GET api/v1/users/currentUser
// @desc    Returns user associated with JWT
// @access  Protected
router.get("/currentUser", userController.getCurrentUser);

// @route   PATCH api/v1/users/updatePassword
// @desc    Update current user's password
// @access  Private
router.patch("/updatePassword", authController.updatePassword);

// @route   PATCH api/v1/users/updateCurrentUser
// @desc    Update current user's name, and email
// @access  Protected
router.patch("/updateCurrentUser", userController.updateCurrentUser);

// @route   PATCH api/v1/users/updateCurrentUserPhoto
// @desc    Update current user's photo
// @access  Protected
router.patch(
  "/updateCurrentUserPhoto",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateCurrentUserPhoto
);

// @route   POST api/v1/users/follow/:id
// @desc    Follows user by their idJWT Response
// @access  Protected
router.post("/follow/:id", userController.followById);

// @route   DELETE api/v1/users/follow/:id
// @desc    Unfollows user by their id
// @access  Protected
router.delete("/follow/:id", userController.unfollowById);

/////////////////////
// Restricted Routes

router.use(authController.restrictTo("admin"));

// @route   PATCH api/v1/users/:id
// @desc    Update user by their id
// @access  Restricted
router.patch("/user/:id", userController.updateUserById);

// @route   DELETE api/v1/users/:id
// @desc    Delete user by their id
// @access  Restricted
router.delete("/user/:id", userController.deleteUserById);

module.exports = router;
