const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Post = require("../models/postModel");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!!!"));

// Read JSON File
const posts = JSON.parse(fs.readFileSync(`${__dirname}/posts.json`, "utf-8"));
const profiles = JSON.parse(
  fs.readFileSync(`${__dirname}/profiles.json`, "utf-8")
);
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

// Import Data into DB
const importData = async () => {
  try {
    await Post.create(posts, { validateBeforeSave: false });
    await Profile.create(profiles, { validateBeforeSave: false });
    await User.create(users, { validateBeforeSave: false });
    console.log("Data successfully imported!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete All Data from DB
const deleteData = async () => {
  try {
    await Post.deleteMany();
    await Profile.deleteMany();
    await User.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") importData();
else if (process.argv[2] === "--delete") deleteData();

// Deleting
// node dev-data/import-dev-data.js --delete

// Importing
// node dev-data/import-dev-data.js --import
