// Utilities
const mongoose = require("mongoose");

// Post schema
const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Post must belong to a user"],
  },
  text: {
    type: String,
    required: [true, "Post must contain text"],
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Comment must belong to a user"],
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      likes: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
      ],
      dislikes: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
      ],
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

///////////////////
// Query Middleware

// Populate required fields for front-end profile page
postSchema.pre(/^find/, function (next) {
  this.populate([
    {
      path: "user",
      select: "name photo handle",
    },
    {
      path: "comments.user",
      select: "name photo handle",
    },
  ]);
  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
