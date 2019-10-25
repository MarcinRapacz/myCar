const express = require("express");
const router = express.Router();
const authenticationController = require("./authenticationController");
const authenticationValidation = require("./authenticationValidation");

router
  .route("/create")
  .post(authenticationValidation.create, authenticationController.create);

router
  .route("/login")
  .post(authenticationValidation.login, authenticationController.login);

module.exports = router;
