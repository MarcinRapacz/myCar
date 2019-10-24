const Authentication = require("./Authentication");

// Utils
const handleError = require("../../utils/handleError");
const handleValidator = require("../../utils/handleValidator");

module.exports.create = async (req, res, next) => {
  try {
    handleValidator(req);

    const authentication = await Authentication.create(req.body);
    const token = authentication.getToken();

    res
      .status(201)
      .json({ succes: true, data: { token }, msg: "User was created" });
  } catch (error) {
    next(error);
  }
};
