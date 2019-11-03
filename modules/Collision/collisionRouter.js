const express = require("express");
const router = express.Router({ mergeParams: true });

// Controllers
const collisionController = require("./collisionController");

// Validations
const collisionValidation = require("./collisionValidation");

// Middlewares
const auth = require("../../middlewares/auth");

router.use(auth);

// @route /api/v1/car/:carId/collision
router
  .route("/")
  .get(collisionValidation.list, collisionController.list)
  .post(collisionValidation.create, collisionController.create);

// @route /api/v1/collision/:id
router
  .route("/:id")
  .get(collisionValidation.get, collisionController.get)
  .put(collisionValidation.update, collisionController.update)
  .delete(collisionValidation.delete, collisionController.delete);

module.exports = router;
