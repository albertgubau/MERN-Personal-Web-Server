const express = require("express");
const md_auth = require("../middlewares/authenticate");
const NewsletterController = require("../controllers/newsletter");

const api = express.Router();

api.post("/newsletter/subscribe", NewsletterController.subscribeEmail);
api.get(
  "/newsletter/all",
  [md_auth.assureAuth],
  NewsletterController.getSubscribedEmails
);
api.delete(
  "/newsletter/:id",
  [md_auth.assureAuth],
  NewsletterController.unsubscribeEmail
);

module.exports = api;
