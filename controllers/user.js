const User = require("../models/user");
const bcrypt = require("bcryptjs");
const image = require("../utils/image");

async function getMe(req, res) {
  const { user_id } = req.userToken;
  const response = await User.findById({ _id: user_id });

  if (!response) {
    res.status(400).send({ msg: "User not found" });
  } else {
    res.status(200).send(response);
  }
}

async function getUsers(req, res) {
  // We use a queryParam called active, to only search for the active users
  const { active } = req.query;

  if (active !== "true" && active !== "false") {
    return res.status(400).send({
      msg: "Invalid value for query parameter 'active'. Expected 'true' or 'false'.",
    });
  }

  let users = null;

  // If we are not adding active queryParam, we apply a normal getAll of all the users
  if (active === undefined) {
    users = await User.find();
  } else {
    users = await User.find({ active });
  }

  if (!users) {
    res.status(400).send({ msg: "Error while retrieving all the users" });
  } else {
    res.status(200).send(users);
  }
}

async function createUser(req, res) {
  const { password } = req.body;

  const user = new User({
    ...req.body,
    active: false,
  });

  // We encrypt the password and we assign it to the password property in Users model
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  if (req.files.avatar) {
    const imagePath = image.getImagePath(req.files.avatar);
    user.avatar = imagePath;
  }

  try {
    const userStorage = await user.save();
    if (userStorage) {
      res.status(201).send(userStorage);
    } else {
      res.status(400).send({ msg: "The user cannot be created" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error creating the user" });
  }
}

async function updateUser(req, res) {
  // Params is in the url like in '/users/1', '1' is the param
  const { id } = req.params;

  const userData = req.body;

  // Password
  if (userData.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userData.password, salt);
    userData.password = hashPassword;
  } else {
    delete userData.password;
  }

  if (req.files.avatar) {
    const imagePath = image.getImagePath(req.files.avatar);
    userData.avatar = imagePath;
  } else {
    delete userData.avatar;
  }

  try {
    const userStorage = await User.findByIdAndUpdate({ _id: id }, userData);

    if (userStorage) {
      res.status(200).send({ msg: "User updated successfully" });
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Error updating the user" });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    const userStorage = await User.findByIdAndDelete({ _id: id });

    if (userStorage) {
      res.status(200).send({ msg: "User deleted successfully" });
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Error deleting the user", error });
  }
}

module.exports = {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
