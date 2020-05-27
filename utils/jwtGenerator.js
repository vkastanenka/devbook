const jwt = require("jsonwebtoken");

// Sign and create the JWT token
module.exports = createJWT = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
