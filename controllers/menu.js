const Menu = require("../models/menu");

async function createMenu(req, res) {
  const menu = new Menu(req.body);

  try {
    const menuStored = await menu.save();
    if (menuStored) {
      res.status(200).send(menuStored);
    } else {
      res.status(400).send({ msg: "Error while creating the menu" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error while creating the menu", error });
  }
}

async function getMenus(req, res) {
  // query is in the url after a "?"
  const { active } = req.query;

  let menus = null;

  if (active === undefined) {
    menus = await Menu.find().sort({ order: "asc" });
  } else {
    menus = await Menu.find({ active }).sort({ order: "asc" });
  }

  if (!menus) {
    res.status(400).send({ msg: "Error while retrieving all the menus" });
  } else {
    res.status(200).send(menus);
  }
}

async function updateMenu(req, res) {
  const { id } = req.params;

  const menuData = req.body;

  try {
    const response = await Menu.findByIdAndUpdate({ _id: id }, menuData);
    if (response) {
      res.status(200).send({ msg: "Menu updated successfully" });
    } else {
      res.status(404).send({ msg: "Menu not found" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error while updating the menu", error });
  }
}

async function deleteMenu(req, res) {
  const { id } = req.params;

  try {
    const response = await Menu.findByIdAndDelete({ _id: id });
    if (response) {
      res.status(200).send({ msg: "Menu deleted correctly" });
    } else {
      res.status(404).send({ msg: "Menu not found" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error while removing the menu", error });
  }
}

module.exports = { createMenu, getMenus, updateMenu, deleteMenu };
