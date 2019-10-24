const express = require("express");
const router = express.Router();
const authenticationController = require("./authenticationController");
const authenticationValidation = require("./authenticationValidation");

router
  .route("/create")
  .post(authenticationValidation.create, authenticationController.create);

module.exports = router;
