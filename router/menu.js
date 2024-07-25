const express = require("express");
const MenuController = require("../controllers/menu");
const md_auth = require("../middlewares/authenticate");

const api = express.Router();

// ENDPOINTS MENU
api.post("/menu/new", [md_auth.assureAuth], MenuController.createMenu);
// We are not using authentification middleware because the menus ara available without authentification
api.get("/menu/all", MenuController.getMenus);

module.exports = api;
