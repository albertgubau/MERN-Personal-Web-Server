const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  title: String,
  path: String,
  order: Number,
  active: Boolean,
});

module.exports = mongoose.model("Menu", MenuSchema);
