const express = require("express");
const router = express.Router();
const authenticationController = require("./authenticationController");
const authenticationValidation = require("./authenticationValidation");

// Middlewares
const auth = require("../../middlewares/auth");

router
  .route("/create")
  .post(authenticationValidation.create, authenticationController.create);

router
  .route("/login")
  .post(authenticationValidation.login, authenticationController.login);

router
  .route("/")
  .get(auth, authenticationController.get)
  .delete(auth, authenticationController.delete);

module.exports = router;
