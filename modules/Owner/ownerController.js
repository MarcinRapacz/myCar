const handleValidator = require("../../utils/handleValidator");
const handleError = require("../../utils/handleError");

const Owner = require("./Owner");
const Car = require("../Car/Car");

// @desc      Get all car owner
// @route     GET /api/v1/car/:carId/
// @access    Private
module.exports.getAll = async (req, res, next) => {
  try {
    handleValidator(req);

    const { carId } = req.params;

    // Check if car exists
    const car = await Car.findById(carId);
    if (!car) handleError({ msg: "Car not found", statusCode: 404 });

    // Check if car exists
    const owners = await Owner.find({ car: carId });

    res.status(200).json({
      success: true,
      content: { quantity: owners.length, owners },
      msg: `Car ${carId} owners were returned`
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Get owner details
// @route     GET /api/v1/owner/:id/
// @access    Private
module.exports.get = async (req, res, next) => {
  try {
    handleValidator(req);

    const { id } = req.params;
    const user = req.user._id;

    const owner = await Owner.findOne({ _id: id, user });
    if (!owner) handleError({ msg: "Owner not found", statusCode: 404 });

    res.status(200).json({
      success: true,
      content: { owner },
      msg: `Owner details`
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Create Owner
// @route     POST /api/v1/car/:carId/
// @access    Private
module.exports.create = async (req, res, next) => {
  try {
    handleValidator(req);

    const { carId } = req.params;
    const user = req.user._id;

    // Check if car exists
    const car = await Car.findOne({ _id: carId, user });
    if (!car) handleError({ msg: "Car not found", statusCode: 404 });

    // Add new owner to car
    const owner = await Owner.create({ ...req.body, car: carId, user });

    res
      .status(201)
      .json({ success: true, content: { owner }, msg: "Owner added" });
  } catch (error) {
    next(error);
  }
};

// @desc      Update owner
// @route     PUT /api/v1/owner/:id/
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

    const owner = await Owner.findOneAndUpdate({ _id: id, user }, req.body, {
      new: true
    });
    if (!owner) handleError({ msg: "Owner not found", statusCode: 404 });

    res
      .status(200)
      .json({ success: true, content: { owner }, msg: "Owner updated" });
  } catch (error) {
    next(error);
  }
};

// @desc      Delete onwer
// @route     DELETE /api/v1/owner/:id/
// @access    Private
module.exports.delete = async (req, res, next) => {
  try {
    handleValidator(req);
    const owner = await Owner.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!owner) handleError({ msg: "Owner not found", statusCode: 404 });

    await owner.remove();

    res
      .status(200)
      .json({ success: true, msg: "Owner was removed", content: {} });
  } catch (error) {
    next(error);
  }
};
