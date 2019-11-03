const handleValidator = require("../../utils/handleValidator");
const handleError = require("../../utils/handleError");
const Insurance = require("./Insurance");
const Car = require("../Car/Car");

// @desc      Get list insurances
// @route     GET /api/v1/car/:carId/insurance
// @access    Private
module.exports.list = async (req, res, next) => {
  try {
    handleValidator(req);
    const { carId } = req.params;

    // Check if car exists
    const car = await Car.findById(carId);
    if (!car) handleError({ msg: "Car not found", statusCode: 404 });

    // Find all insurance
    const list = await Insurance.find({ car: carId });

    res.status(200).json({
      success: true,
      data: { quantity: list.length, list },
      msg: "Insurance list"
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Get insurance detalis
// @route     GET /api/v1/insurance/:id
// @access    Private
module.exports.get = async (req, res, next) => {
  try {
    handleValidator(req);

    const { id } = req.params;
    const user = req.user._id;

    const insurance = await Insurance.findOne({ _id: id, user });
    if (!insurance) handleError({ msg: "Insurance not found" });

    res
      .status(200)
      .json({ success: true, data: { insurance }, msg: "Insurance details" });
  } catch (error) {
    next(error);
  }
};

// @desc      Add new insurance
// @route     POST /api/v1/car/:carId/insurance
// @access    Private
module.exports.create = async (req, res, next) => {
  try {
    handleValidator(req);
    const { carId } = req.params;

    // Check if car exists
    const car = await Car.findOne({ _id: carId, user: req.user._id });
    if (!car) handleError({ msg: "Car not found", statusCode: 404 });

    // Check if insurance already exists
    let insurance = await Insurance.findOne({ car: carId });
    if (insurance)
      handleError({ msg: "Insurance already exists", statusCode: 400 });

    // Add new insurance
    insurance = await Insurance.create({
      ...req.body,
      car: car._id,
      user: req.user._id
    });

    res
      .status(201)
      .json({ success: true, data: { insurance }, msg: "Insurance created" });
  } catch (error) {
    next(error);
  }
};

// @desc      Update insurance
// @route     PUT /api/v1/insurance/:id/
// @access    Private
module.exports.update = async (req, res, next) => {
  try {
    handleValidator(req);

    const { id } = req.params;
    const user = req.user._id;

    // Remove field from request
    delete req.body._id;
    delete req.body.user;
    delete req.body.car;
    delete req.body.__v;
    delete req.body.createdAt;
    delete req.body.updatedAt;

    const insurance = await Insurance.findOneAndUpdate(
      { _id: id, user },
      req.body,
      {
        new: true
      }
    );
    if (!insurance)
      handleError({ msg: "Insurance not found", statusCode: 404 });

    res
      .status(200)
      .json({ success: true, data: { insurance }, msg: "Insurance update" });
  } catch (error) {
    next(error);
  }
};

// @desc      Remove insurance by ID
// @route     DELETE /api/v1/insurance/:id/
// @access    Private
module.exports.delete = async (req, res, next) => {
  try {
    handleValidator(req);
    const insurance = await Insurance.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!insurance)
      handleError({ msg: "Insurance not found", statusCode: 404 });

    await insurance.remove();

    res.status(200).json({ success: true, data: {}, msg: "Insurance removed" });
  } catch (error) {
    next(error);
  }
};
