const jwt = require("../utils/jwt");

// When adding next, you can choose to go to the next function or end before request (middleware)
function assureAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ msg: "The request doesn't have the authentication header" });
  }

  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    const payload = jwt.decoded(token);

    const { exp } = payload;
    const currentDate = new Date().getTime();

    if (exp <= currentDate) {
      return res.status(400).send({ msg: "The token has expired" });
    }

    // To ensure that the next request has the userToken
    req.userToken = payload;
    next();
  } catch (error) {
    return res.status(400).send({ msg: "Invalid Token" });
  }
}

module.exports = {
  assureAuth,
};
