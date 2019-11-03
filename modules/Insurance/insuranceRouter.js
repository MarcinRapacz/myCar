const express = require("express");
const router = express.Router({ mergeParams: true });

// Middlewares
const auth = require("../../middlewares/auth");

// Controllers
const insuranceController = require("./insuranceController");

// Validation
const insuranceValidation = require("./insuranceValidation");

router.use(auth);

// @route /api/v1/car/:carId/insurance
router
  .route("/")
  .get(insuranceValidation.list, insuranceController.list)
  .post(insuranceValidation.create, insuranceController.create);

// @route /api/v1/insurance/:id
router
  .route("/:id")
  .get(insuranceValidation.get, insuranceController.get)
  .put(insuranceValidation.update, insuranceController.update)
  .delete(insuranceValidation.delete, insuranceController.delete);

module.exports = router;
