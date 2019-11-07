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
const insuranceRouter = require("../Insurance/insuranceRouter");
const collisionRouter = require("../Collision/collisionRouter");
const annotationRouter = require("../Annotation/annotationRouter");

// Child router
router.use("/:carId/owner", ownerRouter);
router.use("/:carId/insurance", insuranceRouter);
router.use("/:carId/collision", collisionRouter);
router.use("/:carId/annotation", annotationRouter);

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
