const handleValidator = require("../../utils/handleValidator");
const handleError = require("../../utils/handleError");
const Collision = require("./Collision");
const Car = require("../Car/Car");

// @desc      Get list collisions
// @route     GET /api/v1/car/:carId/collision
// @access    Private
module.exports.list = async (req, res, next) => {
  try {
    handleValidator(req);

    const { carId } = req.params;

    // Check if car exists
    const car = await Car.findById(carId);
    if (!car) handleError({ msg: "Car not found", statusCode: 404 });

    /**
     * Prepare query
     * if you are car owner return full response
     * else return only date of collision
     */
    const query = Collision.find({ car: carId });
    if (req.user._id.toString() !== car.user.toString())
      query.select("-name -description");

    const list = await query;

    res.status(200).json({
      success: true,
      content: { quantity: list.length, list },
      msg: "Collision list"
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Get list insurances
// @route     POST /api/v1/car/:carId/collision
// @access    Private
module.exports.create = async (req, res, next) => {
  try {
    handleValidator(req);

    const { carId } = req.params;
    const { user } = req;

    // Check if car exists
    const car = await Car.findOne({ _id: carId, user: req.user._id });
    if (!car) handleError({ msg: "Car not found", statusCode: 404 });

    // Add new collision
    const collision = await Collision.create({
      ...req.body,
      car: carId,
      user: user._id
    });

    res
      .status(201)
      .json({
        success: true,
        content: { collision },
        msg: "Collision created"
      });
  } catch (error) {
    next(error);
  }
};

// @desc      Get collision details
// @route     GET /api/v1/collision/:id
// @access    Private
module.exports.get = async (req, res, next) => {
  try {
    handleValidator(req);

    const collision = await Collision.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!collision)
      handleError({ msg: "Collission not found", statusCode: 404 });

    res
      .status(200)
      .json({
        success: true,
        content: { collision },
        msg: "Collision details"
      });
  } catch (error) {
    next(error);
  }
};

// @desc      Update collision
// @route     PUT /api/v1/collision/:id
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

    const collision = await Collision.findOneAndUpdate(
      { _id: id, user },
      req.body,
      {
        new: true
      }
    );
    if (!collision)
      handleError({ msg: "Collision not found", statusCode: 404 });

    res
      .status(200)
      .json({
        success: true,
        content: { collision },
        msg: "Collision updated"
      });
  } catch (error) {
    next(error);
  }
};

// @desc      Remove collision
// @route     DELETE /api/v1/collision/:id
// @access    Private
module.exports.delete = async (req, res, next) => {
  try {
    handleValidator(req);

    const collision = await Collision.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!collision)
      handleError({ msg: "Collision not found", statusCode: 404 });

    await collision.remove();

    res
      .status(200)
      .json({ success: true, content: {}, msg: "Collision removed" });
  } catch (error) {
    next(error);
  }
};
