// Set Up Router
const express = require("express");
const router = express.Router();

// Load Controllers
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

/////////////////
// Public Routes

// @route   GET api/v1/users
// @desc    Tests users route
// @access  Public
router.get("/test", userController.test);

// @route   POST api/v1/users/register (DONE)
// @desc    Register user
// @access  Public
router.post("/register", authController.register);

// @route   GET api/v1/users/login (DONE)
// @desc    Login User / JWT Response
// @access  Public
router.post("/login", authController.login);

// @route   POST api/v1/users/sendPasswordResetToken (DONE)
// @desc    Send email with a password reset token
// @access  Public
router.post("/sendPasswordResetToken", authController.sendPasswordResetToken);

// @route   PATCH api/v1/users/resetPassword/:resetToken (DONE)
// @desc    Resets user password with token from email
// @access  Public
router.patch("/resetPassword/:resetToken", authController.resetPassword);

//////////////////
// Private Routes

router.use(authController.protect);

// @route   PATCH api/v1/users/updatePassword (DONE)
// @desc    Update current user's password
// @access  Private
router.patch("/updatePassword", authController.updatePassword);

module.exports = router;
