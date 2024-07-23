const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Import routings
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");

// Configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure static folder
app.use(express.static("uploads"));

// Configure Header HTTP - CORS
app.use(cors());

// Configure routings
app.use(`/api/${process.env.API_VERSION}`, authRoutes);
app.use(`/api/${process.env.API_VERSION}`, userRoutes);

module.exports = app;
