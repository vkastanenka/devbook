// Set up router
const express = require("express");
const router = express.Router();

// Load controllers
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");

/////////////////
// Public Routes

// @route   GET api/v1/posts
// @desc    Tests posts route
// @access  Public
router.get("/test", postController.test);

// @route   GET api/v1/posts
// @desc    Get all posts
// @access  Public
router.get('/', postController.getPosts);

// @route   GET api/v1/posts/post/:id
// @desc    Get post by id
// @access  Public
router.get('/post/:id', postController.getPostById);

// @route   GET api/v1/posts/user/:id
// @desc    Get posts by user id
// @access  Public
router.get('/user/:id', postController.getPostsByUserId);

// @route   GET api/v1/posts/handle/:handle
// @desc    Get posts by handle
// @access  Public
router.get('/handle/:handle', postController.getPostsByHandle);

///////////////////
// Protected Routes

router.use(authController.protect);

// @route   POST api/v1/posts
// @desc    Create post for current user
// @access  Protected
router.post("/currentUser", postController.createCurrentUserPost);

// @route   DELETE api/v1/posts/currentUser/:id
// @desc    Delete post
// @access  Protected
router.delete("/currentUser/:id", postController.deleteCurrentUserPost);

// @route   POST api/v1/posts/like/:id
// @desc    Like post
// @access  Protected
router.post("/like/:id", postController.likePost);

// @route   DELETE api/v1/posts/like/:id
// @desc    Remove like from post
// @access  Protected
router.delete("/like/:id", postController.removeLikeFromPost);

// @route   POST api/v1/posts/dislike/:id
// @desc    Dislike post
// @access  Protected
router.post("/dislike/:id", postController.dislikePost);

// @route   DELETE api/v1/posts/dislike/:id
// @desc    Remove dislike from post
// @access  Protected
router.delete("/dislike/:id", postController.removeDislikeFromPost);

// @route   POST api/v1/posts/comment/:id
// @desc    Add comment to post
// @access  Protected
router.post("/comment/:id", postController.postComment);

// @route   DELETE api/v1/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Protected
router.delete("/comment/:id/:comment_id", postController.deletePostComment);

// @route   POST api/v1/posts/likeComment/:id/:comment_id
// @desc    Like comment
// @access  Protected
router.post('/likeComment/:id/:comment_id', postController.likeComment);

// @route   DELETE api/v1/posts/likeComment/:id/:comment_id
// @desc    Remove like from comment
// @access  Protected
router.delete('/likeComment/:id/:comment_id', postController.removeLikeFromComment);

// @route   POST api/v1/posts/dislikeComment/:id/:comment_id
// @desc    Dislike comment
// @access  Protected
router.post('/dislikeComment/:id/:comment_id', postController.dislikeComment);

// @route   DELETE api/v1/posts/dislikeComment/:id/:comment_id
// @desc    Remove dislike from comment
// @access  Protected
router.delete('/dislikeComment/:id/:comment_id', postController.removeDislikeFromComment);


/////////////////////
// Restricted Routes

router.use(authController.restrictTo("admin"));

// @route   PATCH api/v1/posts/post/:id
// @desc    Update post by id
// @access  Restricted
router.patch('/post/:id', postController.updatePostById);

// @route   DELETE api/v1/posts/post/:id
// @desc    Delete post by id
// @access  Restricted
router.delete('/post/:id', postController.deletePostById);

module.exports = router;
