const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");

async function register(req, res) {
  const { firstName, lastName, email, password } = req.body;

  // Check if required fields are filled
  if (!email) res.status(400).send({ msg: "Email is mandatory" });
  if (!password) res.status(400).send({ msg: "Password is mandatory" });

  const user = new User({
    firstName,
    lastName,
    email: email.toLowerCase(),
    password,
    role: "user",
    active: false,
  });

  // Encrypt the password
  const salt = bcrypt.genSaltSync(10); // Random value added to the password to be unique even if it is repeated by more than one user
  const hashPassword = bcrypt.hashSync(password, salt);

  user.password = hashPassword;

  try {
    const userStorage = await user.save();
    res.status(200).send(userStorage);
  } catch (error) {
    res.status(400).send({ msg: "Error creating the user" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email) res.status(400).send({ msg: "The email is mandatory" });
  if (!password) res.status(400).send({ msg: "The password is mandatory" });

  const emailToLowerCase = email.toLowerCase();

  try {
    const userStorage = await User.findOne({ email: emailToLowerCase });
    if (!userStorage) {
      // If userStore is null, the user does not exist
      res.status(404).send({ msg: "User not found" });
    } else {
      bcrypt.compare(password, userStorage.password, (bcryptError, check) => {
        if (bcryptError || !check) {
          res.status(500).send({ msg: "Server error" });
        } else if (!userStorage.active) {
          res.status(401).send({ msg: "Unauthorized or not active user" });
        } else {
          res.status(200).send({
            access: jwt.createAccessToken(userStorage),
            refresh: jwt.createRefreshToken(userStorage),
          });
        }
      });
    }
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
  }
}

async function refreshAccessToken(req, res) {
  const { token } = req.body;

  if (!token) res.status(400).send({ msg: "The token is mandatory" });

  const { user_id } = jwt.decoded(token);

  try {
    const userStorage = await User.findOne({ _id: user_id });
    if (userStorage) {
      res.status(200).send({ accessToken: jwt.createAccessToken(userStorage) });
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
  }
}

module.exports = {
  register,
  login,
  refreshAccessToken,
};
