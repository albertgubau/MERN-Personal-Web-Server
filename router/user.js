const express = require("express");
const UserController = require("../controllers/user");
const md_auth = require("../middlewares/authenticate");
const multiparty = require("connect-multiparty");

const md_upload = multiparty({ uploadDir: "./uploads/avatar" });
const api = express.Router();

api.get("/users/me", [md_auth.assureAuth], UserController.getMe);
api.get("/users/all", [md_auth.assureAuth], UserController.getUsers);
api.post(
  "/users/new",
  [md_auth.assureAuth, md_upload],
  UserController.createUser
);
// Patch updates only the data that we are sendind in the request body
api.patch(
  "/users/:id",
  [md_auth.assureAuth, md_upload],
  UserController.updateUser
);
api.delete("/users/:id", [md_auth.assureAuth], UserController.deleteUser);

module.exports = api;
