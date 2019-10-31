const handleValidator = require("../../utils/handleValidator");
const handleError = require("../../utils/handleError");
const Car = require("./Car");

// @desc      Get car details
// @route     GET /api/v1/car/:id
// @access    Private
module.exports.get = async (req, res, next) => {
  try {
    handleValidator(req);

    const car = await Car.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate("owners");

    if (!car) handleError({ msg: "Car not found", statusCode: 404 });

    res.status(200).json({ msg: "Car details", data: { car }, success: true });
  } catch (error) {
    next(error);
  }
};

// @desc      Get all cars
// @route     GET /api/v1/car
// @access    Private
module.exports.getAll = async (req, res, next) => {
  try {
    const cars = await Car.find({ user: req.user._id });
    res.status(200).json({
      msg: "Cars Array",
      data: { quantity: cars.length, cars },
      success: true
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Create car
// @route     POST /api/v1/car
// @access    Private
module.exports.create = async (req, res, next) => {
  try {
    handleValidator(req);

    const car = await Car.create({ ...req.body, user: req.user._id });

    res.status(201).json({ msg: "Car created", data: { car }, success: true });
  } catch (error) {
    next(error);
  }
};

// @desc      Create car
// @route     PUT /api/v1/car/:id
// @access    Private
module.exports.update = async (req, res, next) => {
  try {
    handleValidator(req);

    // Remove field from request
    delete req.body._id;
    delete req.body.user;
    delete req.body.__v;
    delete req.body.createdAt;
    delete req.body.updatedAt;

    const car = await Car.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      {
        new: true
      }
    );

    if (!car) handleError({ msg: "Car not found", statusCode: 404 });

    res
      .status(200)
      .json({ msg: "Car was updated", success: true, data: { car } });
  } catch (error) {
    next(error);
  }
};

// @desc      Create car
// @route     DELETE /api/v1/car/:id
// @access    Private
module.exports.delete = async (req, res, next) => {
  try {
    handleValidator(req);
    const car = await Car.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!car) handleError({ msg: "Car not found", statusCode: 404 });

    await car.remove();

    res.status(200).json({ success: true, msg: "Car was removed", data: {} });
  } catch (error) {
    next(error);
  }
};
