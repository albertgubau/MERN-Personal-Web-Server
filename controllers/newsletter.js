const Newsletter = require("../models/newsletter");

async function subscribeEmail(req, res) {
  const { email } = req.body;

  if (!email) res.status(400).send({ msg: "Email is mandatory" });

  const newsletter = new Newsletter({ email: email.toLowerCase() });

  try {
    const response = await newsletter.save();
    if (response) {
      res
        .status(201)
        .send({ msg: "Email subscribed to the newsletter successfully" });
    } else {
      res
        .status(400)
        .send({ msg: "Error subscribing the email to the newsletter" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Error subscribing the email to the newsletter", error });
  }
}

async function getSubscribedEmails(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  try {
    const emailsStored = await Newsletter.paginate({}, options);

    if (emailsStored) {
      res.status(200).send(emailsStored);
    } else {
      res.status(400).send({ msg: "Error retrieving the subscribed emails" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Error retrieving the subscribed emails", error });
  }
}

async function unsubscribeEmail(req, res) {
  const { id } = req.params;

  try {
    const response = await Newsletter.findByIdAndDelete({ _id: id });
    if (response) {
      res.status(200).send({ msg: "Email unsubscribed successfully" });
    } else {
      res.status(404).send({ msg: "Error while unsubscibing the email" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error while unsubscribing the email", error });
  }
}

module.exports = {
  subscribeEmail,
  getSubscribedEmails,
  unsubscribeEmail,
};
