const jwt = require("jsonwebtoken");

// Sign and create the JWT token
module.exports = createJWT = (user) => {
  let profile;
  if (user.profile) profile = user.profile;
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
      handle: user.handle,
      photo: user.photo,
      following: user.following,
      profile: profile
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

/** JWT NEEDS:
 * Name
 * Handle
 * Email
 * Photo
 * Following

CURRENT JWT RESPONSE:

{
exp: 1599587200
iat: 1591811200
  user:
  date: "2020-06-10T17:36:35.538Z"
  email: "vkastanenka@gmail.com"
  following: []
  handle: "vkastanenka"
  name: "Victoria Kastanenka"
  password: "$2a$12$EF0DGZF2h2TEA91zh8abxuew0C3p10IJ4v7DJFkBWOAUf11Bq2Uwu"
  passwordChangedAt: "2020-06-10T17:41:48.645Z"
  photo: "default.jpg"
  posts: []
  role: "user"
  __v: 0
  _id: "5ee11aa498280f0e84ab29aa"
}

email: "vkastanenka@gmail.com"
exp: 1599587346
handle: "vkastanenka"
iat: 1591811346
name: "Victoria Kastanenka"
photo: "default.jpg"
 */
