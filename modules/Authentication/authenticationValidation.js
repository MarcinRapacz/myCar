const { check } = require("express-validator");

module.exports.create = [
  check("name", "The name must have a minimum of 2 characters")
    .trim()
    .isLength({ min: 2 }),
  check("email")
    .isEmail()
    .normalizeEmail(),
  check("password", "The password must have a minimum of 8 characters")
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: 8 }),
  check("password2", "Passwords must be the same").custom(
    (value, { req }) => value === req.body.password
  )
];
