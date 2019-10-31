const express = require("express");
const router = express.Router();

// Controllers
const carController = require("./carController");

// Middlewares
const auth = require("../../middlewares/auth");

// Validators
const carValidation = require("./carValidation");

// Routers
const ownerRouter = require("../Owner/ownerRouter");

// Child router
router.use("/:carId/owner", ownerRouter);

// Auth Middleware
router.use(auth);

router
  .route("/")
  .get(carController.getAll)
  .post(carValidation.create, carController.create);

router
  .route("/:id")
  .get(carValidation.get, carController.get)
  .put(carValidation.update, carController.update)
  .delete(carValidation.delete, carController.delete);

module.exports = router;
