const jwt = require("jsonwebtoken");

function createAccessToken(user) {
  // Create the token and add 3 hours
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 3);

  // Create the payload, data inside the token
  const payload = {
    token_type: "access",
    user_id: user._id,
    iat: Date.now(), // Token creation date
    exp: expToken.getTime(),
  };

  return jwt.sign(payload, process.env.JWT_SECRET_KEY);
}

function createRefreshToken(user) {
  // Create the token and add 3 hours
  const expToken = new Date();
  expToken.setMonth(expToken.getMonth() + 1);

  // Create the payload, data inside the token
  const payload = {
    token_type: "refresh",
    user_id: user._id,
    iat: Date.now(), // Token creation date
    exp: expToken.getTime(),
  };

  return jwt.sign(payload, process.env.JWT_SECRET_KEY);
}

// Decodes the token and returns the data inside of it
function decoded(token) {
  return jwt.decode(token, process.env.JWT_SECRET_KEY, true);
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  decoded,
};
