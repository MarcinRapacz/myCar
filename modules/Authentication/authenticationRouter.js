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
  .route("/create-test-account")
  .get(authenticationController.createTestAccount);

router
  .route("/login")
  .post(authenticationValidation.login, authenticationController.login);

router.route("/forgot-password").put(authenticationController.forgotPassword);

router
  .route("/reset-password/:resetPasswordToken")
  .put(
    authenticationValidation.resetPassword,
    authenticationController.resetPassword
  );

router
  .route("/")
  .get(auth, authenticationController.get)
  .put(auth, authenticationValidation.update, authenticationController.update)
  .delete(auth, authenticationController.delete);

module.exports = router;
