// Set up router
const express = require("express");
const router = express.Router();

// Load controllers
const authController = require('../controllers/authController');
const profileController = require("../controllers/profileController");

/////////////////
// Public Routes

// @route   GET api/v1/profiles/test
// @desc    Tests profiles route
// @access  Public
router.get("/test", profileController.test);

// @route   GET api/v1/profiles
// @desc    Get all profiles
// @access  Public
router.get('/', profileController.getAllProfiles);

// @route   GET api/v1/profiles/profile/:id
// @desc    Return profile by id
// @access  Public
router.get('/profile/:id', profileController.getProfileById);

// @route   GET api/v1/profiles/handle/:handle
// @desc    Returns profile by handle
// @access  Public
router.get('/handle/:handle', profileController.getProfileByHandle);

///////////////////
// Protected Routes

router.use(authController.protect);

// @route   POST api/v1/profiles/currentUser
// @desc    Create current user's profile
// @access  Protected
router.post('/currentUser', profileController.createCurrentUserProfile);

// @route   PATCH api/v1/profiles/currentUser
// @desc    Update current user's profile
// @access  Protected
router.patch('/currentUser', profileController.updateCurrentUserProfile);

// @route   POST api/v1/profiles/education
// @desc    Add education to profile
// @access  Protected
router.post('/education', profileController.addEducation);

// @route   DELETE api/v1/profiles/education/:id
// @desc    Delete education from profile
// @access  Protected
router.delete('/education/:id', profileController.deleteEducation);

// @route   POST api/v1/profiles/experience
// @desc    Add experience to profile
// @access  Protected
router.post('/experience', profileController.addExperience);

// @route   DELETE api/v1/profiles/experience/:id
// @desc    Delete experience from profile
// @access  Protected
router.delete('/experience/:id', profileController.deleteExperience);

/////////////////////
// Restricted Routes

router.use(authController.restrictTo('admin'));

// @route   PATCH api/v1/profiles/profile/:id
// @desc    Update profile by id
// @access  Restricted
router.patch('/profile/:id', profileController.updateProfileById);

// @route   DELETE api/v1/profiles/profile/:id
// @desc    Delete profile by id
// @access  Restricted
router.delete('/profile/:id', profileController.deleteProfileById);

module.exports = router;