const crypto = require("crypto");
const Authentication = require("./Authentication");

// Utils
const handleError = require("../../utils/handleError");
const handleValidator = require("../../utils/handleValidator");
const handleSendEmail = require("../../utils/handleSendEmail");

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

    if (name) user.name = name;
    if (phoneNumber || phoneNumber === "") user.phoneNumber = phoneNumber;

    await user.save();

    res.status(200).json({
      succes: true,
      data: { user },
      msg: "User updated"
    });
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    await req.user.remove();

    res.status(200).json({
      succes: true,
      data: {},
      msg: "User removed"
    });
  } catch (error) {
    next(error);
  }
};

module.exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Authentication.findOne({ email });

    if (!user) handleError({ msg: "User not found", statusCode: 404 });

    user.resetPasswordToken = crypto.randomBytes(16).toString("hex");
    user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    await user.save();

    if (process.env.NODE_ENV === "production") {
      const resetUrl = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/authentication/resetpassword/${user.resetPasswordToken}`;

      const text = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

      await handleSendEmail({
        to: user.email,
        subject: "Password reset",
        text
      });
    }

    res.status(200).json({
      succes: true,
      data: {
        resetPasswordExpire: user.resetPasswordToken,
        resetPasswordToken: user.resetPasswordExpire
      },
      msg: "Reset Password Token has generated"
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
