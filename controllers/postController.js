// Utilities
const factory = require("./handlerFactory");

// Error Handling
const catchAsync = require("../utils/catchAsync");

// Validation
const validatePostInput = require("../validation/post/createPost");

// Models
const Post = require("../models/postModel");
const User = require("../models/userModel");

/////////////////
// Public Routes

// @route   GET api/v1/posts
// @desc    Tests posts route
// @access  Public
exports.test = (req, res, next) => {
  res.json({ message: "Posts route secured" });
};

// @route   GET api/v1/posts
// @desc    Get all posts
// @access  Public
exports.getPosts = factory.getAll(Post);

// @route   GET api/v1/posts/post/:id
// @desc    Get post by id
// @access  Public
exports.getPostById = factory.getOne(Post);

// @route   GET api/v1/posts/user/:id
// @desc    Get posts by user id
// @access  Public
exports.getPostsByUserId = catchAsync(async (req, res, next) => {
  // Find user
  const user = await User.findById(req.params.id).populate([
    { path: "profile" },
    { path: "posts", populate: { path: "comments" } },
    {
      path: "following",
      select: "photo name handle posts",
      populate: { path: "posts", populate: { path: "comments" } },
    },
  ]);

  // Respond if no user is found
  query404(user, res, "There is no user with that id");

  // Organize posts
  const followPostsSubArray = user.following
    .filter((follow) => follow.posts.length !== 0)
    .map((follow) => follow.posts);

  let followPosts = [];
  followPostsSubArray.forEach((follow) => (followPosts = [...follow]));
  let posts = [...user.posts, ...followPosts];

  // Sort the posts from newest to oldest
  posts = posts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  // Respond
  res.status(200).json(posts);
});

// @route   GET api/v1/posts/handle/:handle
// @desc    Get posts by handle
// @access  Public
exports.getPostsByHandle = catchAsync(async (req, res, next) => {
  // Find profile
  const user = await User.findOne({
    handle: req.params.handle,
  }).populate([
    { path: "profile" },
    { path: "posts", populate: { path: "comments" } },
    {
      path: "following",
      select: "photo name handle posts",
      populate: { path: "posts", populate: { path: "comments" } },
    },
  ]);

  // Respond if no user is found
  query404(user, res, "There is no user with that id");

  // Organize posts
  const followPostsSubArray = user.following
    .filter((follow) => follow.posts.length !== 0)
    .map((follow) => follow.posts);

  let followPosts = [];
  followPostsSubArray.forEach((follow) => (followPosts = [...follow]));
  let posts = [...user.posts, ...followPosts];

  // Sort the posts from newest to oldest
  posts = posts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  // Respond
  res.status(200).json(posts);
});

///////////////////
// Protected Routes

// @route   POST api/v1/posts/currentUser
// @desc    Create post for current user
// @access  Protected
exports.createCurrentUserPost = catchAsync(async (req, res, next) => {
  // Validate Inputs
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  // Create a new post document
  const newPost = new Post({ user: req.user.id, text: req.body.text });

  // Add the new post's ID to the current user's document
  const user = await User.findOne({ _id: req.user.id });
  user.posts.unshift(newPost._id);

  // Save the user and post documents
  await user.save({ validateBeforeSave: false });
  await newPost.save();

  // Obtain post with populated fields
  const populatedPost = await Post.findOne({ _id: newPost._id });

  // Respond with the fully populated post
  res.status(201).json(populatedPost);
});

// @route   DELETE api/v1/posts/currentUser/:id
// @desc    Delete post for current user by id
// @access  Protected
exports.deleteCurrentUserPost = catchAsync(async (req, res, next) => {
  // Find post
  const post = await Post.findById(req.params.id);

  // Check if post exists / belongs to the current user
  if (!post) return res.status(404).json({ postnotfound: "No post found" });
  if (post.user._id.toString() !== req.user.id) {
    return res.status(401).json({ notauthorized: "User not authorized" });
  }

  // Find the user document to remove post id reference from
  const user = await User.findById(req.user.id);

  // Remove reference to post from user document
  const removalIndex = user.posts.indexOf(req.params.id);
  user.posts.splice(removalIndex, 1);
  await user.save({ validateBeforeSave: false });

  // Delete and repond
  await post.remove();
  res.status(204).json({ success: true });
});

// @route   POST api/v1/posts/like/:id
// @desc    Like post by id
// @access  Protected
exports.likePost = catchAsync(async (req, res, next) => {
  // Find post
  const post = await Post.findById(req.params.id);

  // Check if post exists
  if (!post) return res.status(404).json({ postnotfound: "No post found" });

  // Check if the user has already liked the post
  const likeIndex = post.likes.indexOf(req.user.id);
  if (likeIndex > -1) {
    return res
      .status(400)
      .json({ alreadyliked: "User already liked this post" });
  }

  // Add user id to the post's likes array
  post.likes.unshift(req.user.id);

  // If user has disliked, will remove dislike once they like the post
  const dislikeIndex = post.dislikes.indexOf(req.user.id);
  if (dislikeIndex > -1) post.dislikes.splice(dislikeIndex, 1);

  // Save and respond
  await post.save();
  res.status(200).json(post);
});

// @route   DELETE api/v1/posts/like/:id
// @desc    Remove like from post
// @access  Protected
exports.removeLikeFromPost = catchAsync(async (req, res, next) => {
  // Find post
  const post = await Post.findById(req.params.id);

  // Check if the post exists
  if (!post) return res.status(404).json({ postnotfound: "No post found" });

  // Check if the current user has liked the post
  const likeIndex = post.likes.indexOf(req.user.id);
  if (likeIndex < 0) {
    return res
      .status(400)
      .json({ notliked: "You have not yet liked this post" });
  }

  // Splice from array
  post.likes.splice(likeIndex, 1);

  // Save and respond
  await post.save();
  res.status(200).json(post);
});

// @route   POST api/v1/posts/dislike/:id
// @desc    Dislike post
// @access  Protected
exports.dislikePost = catchAsync(async (req, res, next) => {
  // Find post
  const post = await Post.findById(req.params.id);

  // Check if the post exists
  if (!post) return res.status(404).json({ postnotfound: "No post found" });

  // Check if the current user has already disliked the post
  const dislikeIndex = post.dislikes.indexOf(req.user.id);
  if (dislikeIndex > -1) {
    return res
      .status(400)
      .json({ alreadydisliked: "User already disliked this post" });
  }

  // Add user id to the post's likes array
  post.dislikes.unshift(req.user.id);

  // If user has liked, will remove like once they dislike the post
  const likeIndex = post.likes.indexOf(req.user.id);
  if (likeIndex > -1) post.likes.splice(likeIndex, 1);

  // Save and respond
  await post.save();
  res.status(200).json(post);
});

// @route   DELETE api/v1/posts/dislike/:id
// @desc    Remove dislike from post
// @access  Protected
exports.removeDislikeFromPost = catchAsync(async (req, res, next) => {
  // Find post
  const post = await Post.findById(req.params.id);

  // Check if the post exists
  if (!post) return res.status(404).json({ postnotfound: "No post found" });

  // Check if the user has already disliked the post
  const dislikeIndex = post.dislikes.indexOf(req.user.id);
  if (dislikeIndex < 0) {
    return res
      .status(400)
      .json({ notliked: "You have not yet disliked this post" });
  }

  // Splice from array
  post.dislikes.splice(dislikeIndex, 1);

  // Save and respond
  await post.save();
  res.status(200).json(post);
});

// @route   POST api/v1/posts/comment/:id
// @desc    Add comment to post
// @access  Protected
exports.postComment = catchAsync(async (req, res, next) => {
  // Validate inputs
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  // Find post
  const post = await Post.findById(req.params.id);

  // Check if the post exists
  if (!post) return res.status(404).json({ postnotfound: "No post found" });

  // Create new comment
  const newComment = {
    text: req.body.text,
    user: req.user.id,
  };

  // Add comment to post document array
  post.comments.unshift(newComment);

  // Save and respond
  await post.save();

  // Obtain post with populated fields
  const populatedPost = await Post.findOne({ _id: post._id });

  // Respond
  res.status(200).json(populatedPost);
});

// @route   DELETE api/v1/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Protected
exports.deletePostComment = catchAsync(async (req, res, next) => {
  // Find post
  const post = await Post.findById(req.params.id);

  // Check if the post exists
  if (!post) return res.status(404).json({ postnotfound: "No post found" });

  // Checking if comment exists
  const filteredComments = post.comments.filter(
    (comment) => comment._id.toString() === req.params.comment_id
  );
  if (filteredComments.length === 0) {
    return res.status(404).json({ commentnotexists: "Comment does not exist" });
  }

  // Get remove index
  const removalIndex = post.comments
    .map((comment) => comment._id.toString())
    .indexOf(req.params.comment_id);

  // Splice comment out of array
  post.comments.splice(removalIndex, 1);

  // Save and respond
  await post.save();
  res.status(200).json(post);
});

// @route   POST api/v1/posts/likeComment/:id/:comment_id
// @desc    Like comment
// @access  Protected
exports.likeComment = catchAsync(async (req, res, next) => {
  // Find post
  const post = await Post.findById(req.params.id);

  // Check if the post exists
  if (!post) return res.status(404).json({ postnotfound: "No post found" });

  // Checking is user has already liked the comment
  const filteredComments = post.comments.filter(
    (comment) => comment._id.toString() === req.params.comment_id
  );
  if (filteredComments.length === 0) {
    return res.status(404).json({ commentnotexists: "Comment does not exist" });
  }

  const likeIndex = filteredComments[0].likes.indexOf(req.user.id);
  if (likeIndex > -1) {
    return res
      .status(400)
      .json({ alreadyliked: "User has already liked this comment" });
  }

  // Add user id to likes array
  post.comments.forEach((comment) => {
    if (comment._id.toString() === req.params.comment_id) {
      comment.likes.unshift(req.user.id);
    }
  });

  // If user has disliked the comment, remove the dislike once they like the comment
  const dislikeIndex = filteredComments[0].dislikes.indexOf(req.user.id);
  if (dislikeIndex > -1) {
    post.comments.forEach((comment) => {
      if (comment._id.toString() === req.params.comment_id) {
        comment.dislikes.splice(dislikeIndex, 1);
      }
    });
  }

  // Save and respond
  await post.save();
  res.status(200).json(post);
});

// @route   DELETE api/v1/posts/likeComment/:id/:comment_id
// @desc    Remove like from comment
// @access  Protected
exports.removeLikeFromComment = catchAsync(async (req, res, next) => {
  // Find post
  const post = await Post.findById(req.params.id);

  // Check if the post exists
  if (!post) return res.status(404).json({ postnotfound: "No post found" });

  // Checking is user has liked the post
  const filteredComments = post.comments.filter(
    (comment) => comment._id.toString() === req.params.comment_id
  );
  if (filteredComments.length === 0) {
    return res.status(404).json({ commentnotexists: "Comment does not exist" });
  }

  const likeIndex = filteredComments[0].likes.indexOf(req.user.id);
  if (likeIndex < 0) {
    return res
      .status(401)
      .json({ notliked: "User has not yet liked this comment" });
  }

  // Remove like from the comment
  post.comments.forEach((comment) => {
    if (comment._id.toString() === req.params.comment_id) {
      comment.likes.splice(likeIndex, 1);
    }
  });

  // Save and respond
  await post.save();
  res.status(200).json(post);
});

// @route   POST api/v1/posts/dislikeComment/:id/:comment_id
// @desc    Dislike comment
// @access  Protected
exports.dislikeComment = catchAsync(async (req, res, next) => {
  // Find post
  const post = await Post.findById(req.params.id);

  // Check if the post exists
  if (!post) return res.status(404).json({ postnotfound: "No post found" });

  // Checking is user has already liked the post
  const filteredComments = post.comments.filter(
    (comment) => comment._id.toString() === req.params.comment_id
  );
  if (filteredComments.length === 0) {
    return res.status(404).json({ commentnotexists: "Comment does not exist" });
  }

  const dislikeIndex = filteredComments[0].dislikes.indexOf(req.user.id);
  if (dislikeIndex > -1) {
    return res
      .status(400)
      .json({ alreadydisliked: "User has already disliked this comment" });
  }

  // Add user id to likes array
  post.comments.forEach((comment) => {
    if (comment._id.toString() === req.params.comment_id) {
      comment.dislikes.unshift(req.user.id);
    }
  });

  // If user has liked the comment, remove the like once they like the comment
  const likeIndex = filteredComments[0].likes.indexOf(req.user.id);
  if (likeIndex > -1) {
    post.comments.forEach((comment) => {
      if (comment._id.toString() === req.params.comment_id) {
        comment.likes.splice(likeIndex, 1);
      }
    });
  }

  // Save and respond
  await post.save();
  res.status(200).json(post);
});

// @route   DELETE api/v1/posts/dislikeComment/:id/:comment_id
// @desc    Remove dislike from comment
// @access  Protected
exports.removeDislikeFromComment = catchAsync(async (req, res, next) => {
  // Find post
  const post = await Post.findById(req.params.id);

  // Check if the post exists
  if (!post) return res.status(404).json({ postnotfound: "No post found" });

  // Checking is user has liked the post
  const filteredComments = post.comments.filter(
    (comment) => comment._id.toString() === req.params.comment_id
  );
  if (filteredComments.length === 0) {
    return res.status(404).json({ commentnotexists: "Comment does not exist" });
  }

  const dislikeIndex = filteredComments[0].dislikes.indexOf(req.user.id);
  if (dislikeIndex < 0) {
    return res
      .status(401)
      .json({ notdisliked: "User has not yet disliked this comment" });
  }

  // Remove dislike from the comment
  post.comments.forEach((comment) => {
    if (comment._id.toString() === req.params.comment_id) {
      comment.dislikes.splice(dislikeIndex, 1);
    }
  });

  // Save and respond
  await post.save();
  res.status(200).json(post);
});

/////////////////////
// Restricted Routes

// @route   PATCH api/v1/posts/post/:id
// @desc    Update post by id
// @access  Restricted
exports.updatePostById = factory.updateOne(Post);

// @route   DELETE api/v1/posts/post/:id
// @desc    Delete post by id
// @access  Restricted
exports.deletePostById = factory.deleteOne(Post);
