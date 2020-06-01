// Utilities
const mongoose = require("mongoose");

// Profile schema
const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Profile must belong to a user"],
  },
  status: {
    type: String,
    required: [true, "Profile must have a developer status"],
  },
  skills: {
    type: [String],
    required: [true, "Profile must have skills specified"],
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
        required: [true, "Position title is required"],
      },
      company: {
        type: String,
        required: [true, "Company name is required"],
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: [true, "Position start date is required"],
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: [true, "School name is required"],
      },
      degree: {
        type: String,
        required: [true, "Degree title is required"],
      },
      fieldofstudy: {
        type: String,
        required: [true, "Field of study is required"],
      },
      from: {
        type: Date,
        required: [true, "Start date it required"],
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

///////////////////
// Query Middleware

// Populate required fields for front-end profile page
profileSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo following posts",
    populate: {
      path: "following",
      select: "name photo handle posts",
    },
  });

  next();
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
