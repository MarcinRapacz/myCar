const { validationResult } = require("express-validator");
const handleError = require("./handleError");

module.exports = req => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    handleError({
      data: errors.array(),
      statusCode: 401,
      msg: "Validation Field"
    });
  }
  return null;
};
