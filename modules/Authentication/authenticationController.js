const Authentication = require("./Authentication");

// Utils
const handleError = require("../../utils/handleError");
const handleValidator = require("../../utils/handleValidator");

module.exports.create = async (req, res, next) => {
  try {
    handleValidator(req);

    // Variables
    const { email } = req.body;

    // Check if the email address is free
    const isExists = await Authentication.findOne({ email });
    if (isExists) handleError({ msg: "User already exists", statusCode: 400 });

    // Store user
    const authentication = await Authentication.create(req.body);
    const token = authentication.getToken();

    res
      .status(201)
      .json({ succes: true, data: { token }, msg: "User was created" });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    handleValidator(req);

    // Variables
    const { email, password } = req.body;

    // Login user
    const user = await Authentication.login({ email, password });
    if (!user) {
      handleError({ msg: "Invalid credentials", statusCode: 401 });
    }

    // Get token
    const token = user.getToken();

    res
      .status(200)
      .json({ succes: true, data: { token }, msg: "User was logged" });
  } catch (error) {
    next(error);
  }
};

module.exports.get = async (req, res, next) =>
  res.status(200).json({
    succes: true,
    data: {
      user: req.user
    },
    msg: "User details"
  });

module.exports.update = async (req, res, next) => {
  try {
    handleValidator(req);

    const { name, phoneNumber } = req.body;
    const { user } = req;

    user.set({
      name,
      phoneNumber
    });

    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  req.user.remove();

  res.status(200).json({
    succes: true,
    data: {},
    msg: "User removed"
  });
};
