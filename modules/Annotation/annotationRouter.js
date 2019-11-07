const express = require("express");
const router = express.Router({ mergeParams: true });

// Controllers
const annotationController = require("./annotationController");

// Validations
const annotationValidation = require("./annotationValidation");

// Middlewares
const auth = require("../../middlewares/auth");

router.use(auth);

router
  .route("/")
  .get(annotationValidation.list, annotationController.list)
  .post(annotationValidation.create, annotationController.create);

router
  .route("/:id")
  .get(annotationValidation.get, annotationController.get)
  .put(annotationValidation.update, annotationController.update)
  .delete(annotationValidation.delete, annotationController.delete);

module.exports = router;
