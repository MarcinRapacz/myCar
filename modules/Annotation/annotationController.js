const handleValidator = require("../../utils/handleValidator");
const handleError = require("../../utils/handleError");

const Annotation = require("./Annotation");
const AvaliableAnnotations = require("../AvaliableAnnotations/AvaliableAnnotations");
const Car = require("../Car/Car");

// @desc      Add new annotation
// @route     POST /api/v1/car/:carId/annotation
// @access    Private
module.exports.create = async (req, res, next) => {
  try {
    handleValidator(req);

    const { name, description } = req.body;
    const { carId } = req.params;

    /*
     * Check if car exists
     * Check if annotation is available
     */
    const [car, avaliableAnnotation] = await Promise.all([
      await Car.findOne({ _id: carId, user: req.user._id }),
      await AvaliableAnnotations.findOne({ name })
    ]);
    if (!car) handleError({ msg: "Car not found", statusCode: 404 });
    if (!avaliableAnnotation)
      handleError({ msg: "Annotation is unavailable", statusCode: 400 });

    // Check if annotation is already in car
    const alreadyExist = await Annotation.findOne({
      car: carId,
      details: avaliableAnnotation._id
    });
    if (alreadyExist)
      handleError({ msg: "Annotation is already exist", statusCode: 400 });

    // Create new annotation
    const annotation = await Annotation.create({
      details: avaliableAnnotation._id,
      description,
      car: carId,
      user: req.user._id
    });

    res
      .status(201)
      .json({ success: true, data: { annotation }, msg: "Annotation created" });
  } catch (error) {
    next(error);
  }
};

// @desc      Get annotations list
// @route     GET /api/v1/car/:carId/annotation
// @access    Private
module.exports.list = async (req, res, next) => {
  try {
    handleValidator(req);
    const { carId } = req.params;

    // Check if car exists
    const car = await Car.findOne({ _id: carId, user: req.user._id });
    if (!car) handleError({ msg: "Car not found", statusCode: 404 });

    // Fina all annotations
    const list = await Annotation.find({ car: carId }).populate("details");

    res.status(200).json({
      success: true,
      data: { quantity: list.length, list },
      msg: "Annotations list"
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Get annotation details
// @route     GET /api/v1/annotation/:id
// @access    Private
module.exports.get = async (req, res, next) => {
  try {
    handleValidator(req);

    const annotation = await Annotation.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate("details");

    if (!annotation)
      handleError({ msg: "Annotation not found", statusCode: 404 });

    res
      .status(200)
      .json({ success: true, data: { annotation }, msg: "Annotation details" });
  } catch (error) {
    next(error);
  }
};

// @desc      Update annotation
// @route     PUT /api/v1/annotation/:id
// @access    Private
module.exports.update = async (req, res, next) => {
  try {
    handleValidator(req);

    const annotation = await Annotation.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id
      },
      { description: req.body.description },
      {
        new: true
      }
    ).populate("details");

    if (!annotation)
      handleError({ msg: "Annotation not found", statusCode: 404 });

    res
      .status(200)
      .json({ success: true, data: { annotation }, msg: "Annotation updated" });
  } catch (error) {
    next(error);
  }
};

// @desc      Remove annotation
// @route     DELETE /api/v1/annotation/:id
// @access    Private
module.exports.delete = async (req, res, next) => {
  try {
    handleValidator(req);

    const annotation = await Annotation.findOneAndRemove({
      _id: req.params.id,
      user: req.user._id
    });

    if (!annotation)
      handleError({ msg: "Annotation not found", statusCode: 404 });

    res
      .status(200)
      .json({ success: true, data: {}, msg: "Annotation removed" });
  } catch (error) {
    next(error);
  }
};
