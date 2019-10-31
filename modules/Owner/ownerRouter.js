const express = require("express");
const router = express.Router({ mergeParams: true });

// Middlewares
const auth = require("../../middlewares/auth");

// Controllers
const ownerController = require("./ownerController");

// Validation
const onwerValidation = require("./ownerValidation");

router.use(auth);

router
  .route("/")
  .get(onwerValidation.getAll, ownerController.getAll)
  .post(onwerValidation.create, ownerController.create);

router
  .route("/:id")
  .get(onwerValidation.get, ownerController.get)
  .put(onwerValidation.update, ownerController.update)
  .delete(onwerValidation.delete, ownerController.delete);

module.exports = router;
