const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Import routings
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const menuRoutes = require("./router/menu");
const courseRoutes = require("./router/course");
const postRoutes = require("./router/post");
const newsletterRoutes = require("./router/newsletter");

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
app.use(`/api/${process.env.API_VERSION}`, menuRoutes);
app.use(`/api/${process.env.API_VERSION}`, courseRoutes);
app.use(`/api/${process.env.API_VERSION}`, postRoutes);
app.use(`/api/${process.env.API_VERSION}`, newsletterRoutes);

module.exports = app;
