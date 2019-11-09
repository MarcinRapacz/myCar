const express = require("express");
const router = express.Router();

// Controller
const avaliableAnnotationsController = require("./avaliableAnnotationsController");

// Validation
const avaliableAnnotationsValidation = require("./avaliableAnnotationsValidation");

// Middlewares
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/admin");

router.use(auth);

router
  .route("/")
  .get(avaliableAnnotationsValidation.list, avaliableAnnotationsController.list)
  .post(
    admin,
    avaliableAnnotationsValidation.create,
    avaliableAnnotationsController.create
  );

router.use(admin);
router
  .route("/:slugifyText")
  .put(
    avaliableAnnotationsValidation.update,
    avaliableAnnotationsController.update
  )
  .delete(
    avaliableAnnotationsValidation.delete,
    avaliableAnnotationsController.delete
  );

module.exports = router;
