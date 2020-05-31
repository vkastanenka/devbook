// Utilities
import jwt_decode from "jwt-decode";
import setAuthToken from './setAuthToken';

// Decodes JWT
const decodeToken = (token) => {
  // Set token to ls
  localStorage.setItem("jwtToken", token);
  // Set token to Auth header
  setAuthToken(token);
  // Return decoded token to get user data
  return jwt_decode(token);
};

export default decodeToken;