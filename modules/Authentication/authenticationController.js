const crypto = require("crypto");
const Authentication = require("./Authentication");

// Utils
const handleError = require("../../utils/handleError");
const handleValidator = require("../../utils/handleValidator");
const handleSendEmail = require("../../utils/handleSendEmail");

// @desc      Create user
// @route     POST /api/v1/authentication/create
// @access    Public
module.exports.create = async (req, res, next) => {
  try {
    handleValidator(req);

    // Variables
    const { email, name, password } = req.body;

    // Check if the email address is free
    const isExists = await Authentication.findOne({ email });
    if (isExists) handleError({ msg: "User already exists", statusCode: 400 });

    // Store user
    const authentication = await Authentication.create({
      email,
      name,
      password
    });
    const token = authentication.getToken();

    res
      .status(201)
      .json({ succes: true, content: { token }, msg: "User was created" });
  } catch (error) {
    next(error);
  }
};

// @desc      Login user
// @route     POST /api/v1/authentication/login
// @access    Public
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
      .json({ succes: true, content: { token }, msg: "User was logged" });
  } catch (error) {
    next(error);
  }
};

// @desc      Get User details
// @route     GET /api/v1/authentication
// @access    Private
module.exports.get = async (req, res, next) => {
  const user = await Authentication.findById(req.user._id);
  res.status(200).json({
    succes: true,
    content: {
      user
    },
    msg: "User details"
  });
};

// @desc      Update User
// @route     PUT /api/v1/authentication
// @access    Private
module.exports.update = async (req, res, next) => {
  try {
    handleValidator(req);

    const { name, phoneNumber } = req.body;
    const { user } = req;

    // Check which data should update
    if (name) user.name = name;
    if (phoneNumber || phoneNumber === "") user.phoneNumber = phoneNumber;

    await user.save();
    const token = user.getToken();

    res.status(200).json({
      succes: true,
      content: { token },
      msg: "User updated"
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Delete User
// @route     DELETE /api/v1/authentication
// @access    Private
module.exports.delete = async (req, res, next) => {
  try {
    await req.user.remove();

    res.status(200).json({
      succes: true,
      content: {},
      msg: "User removed"
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Generate Reset Password Token
// @route     PUT /api/v1/authentication/forgot-password
// @access    Public
module.exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Authentication.findOne({ email });

    if (!user) handleError({ msg: "User not found", statusCode: 404 });

    // Generate token
    user.resetPasswordToken = crypto.randomBytes(16).toString("hex");
    user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    await user.save();

    // On production send email with token
    if (process.env.NODE_ENV === "production") {
      const resetUrl = `${req.protocol}://${req.get("host")}/reset-password/${
        user.resetPasswordToken
      }`;

      const text = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

      await handleSendEmail({
        to: user.email,
        subject: "Password reset",
        text
      });
    }

    res.status(200).json({
      succes: true,
      content: {
        resetPasswordExpire: user.resetPasswordExpire,
        resetPasswordToken: user.resetPasswordToken
      },
      msg: "Reset Password Token has generated"
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Reset password
// @route     PUT /api/v1/authentication/reset-password/:resetPasswordToken
// @access    Public
module.exports.resetPassword = async (req, res, next) => {
  try {
    handleValidator(req);
    const { resetPasswordToken } = req.params;
    const { password } = req.body;

    const user = await Authentication.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) handleError({ msg: "User not found", statusCode: 404 });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    const token = user.getToken();

    res
      .status(200)
      .json({ msg: "Password was changed", content: { token }, success: true });
  } catch (error) {
    next(error);
  }
};

// @desc      Create account to test
// @route     GET /api/v1/authentication/create-test-account
// @access    Public
module.exports.createTestAccount = async (req, res, next) => {
  try {
    const randomName = crypto.randomBytes(8).toString("hex");
    const randomPass = crypto.randomBytes(8).toString("hex");

    // Create random user
    const user = await Authentication.create({
      name: `user-${randomName}`,
      email: `${randomName}@test-account.com`,
      password: randomPass,
      isActivated: true
    });

    const token = user.getToken();

    // Preapre data to response
    const content = {
      token,
      user: {
        name: user.name,
        password: randomPass,
        email: user.email
      }
    };

    res.status(201).json({
      succes: true,
      content,
      msg: "Created account to test"
    });
  } catch (error) {
    next(error);
  }
};
