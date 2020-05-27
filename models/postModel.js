// Utilities
const mongoose = require("mongoose");

// Post schema
const postSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Post must belong to a user"]
  },
  text: {
    type: String,
    required: [true, 'Post must contain text']
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  dislikes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Comment must belong to a user"]
      },
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now()
      },
      likes: [
        {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
      ],
      dislikes: [
        {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
      ]
    }
  ],
  date: {
    type: Date,
    default: Date.now()
  }
});

///////////////////
// Query Middleware

// Populate required fields for front-end profile page
postSchema.pre(/^find/, function(next) {
  this.populate([
    {
      path: "user",
      select: "name photo profile",
      populate: {
        path: "profile",
        select: "handle -user"
      }
    },
    {
      path: "comments.user",
      select: "name photo profile",
      populate: {
        path: "profile",
        select: "handle -user"
      }
    }
  ]);
  next();
});

module.exports = Post = mongoose.model("Post", postSchema);
