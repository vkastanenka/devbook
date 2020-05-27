// Error Handling
const catchAsync = require("./../utils/catchAsync");

// Models
const User = require("../models/userModel");

////////////////
// Public Routes

// @route   GET api/v1/users/test
// @desc    Tests users route
// @access  Public
exports.test = (req, res, next) => res.json({ message: "Users route secured" });