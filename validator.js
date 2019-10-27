const { check } = require("express-validator");

/**
 * Check if string is valid
 * @param field field name
 * @param msg error message
 * @param min minimum length (default: 0)
 * @param max maximum length (default: 400)
 */
module.exports.string = (field, msg, min = 0, max = 400) =>
  check(field, msg)
    .trim()
    .isLength({ min, max });

/**
 * Check if field is correct address email
 * @param field email address (default: email)
 */
module.exports.email = (field = "email") =>
  check(field)
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false });

/**
 * Check if fields is same
 * @param field1 first field
 * @param field2 seccound field
 * @param msg error message
 */
module.exports.isSame = (field1, field2, msg) =>
  check(field2, msg).custom((value, { req }) => value === req.body[field1]);

/**
 * Check if field is correct phone number
 * @param field phone number
 * @param msg error message
 */
module.exports.phoneNumber = (field = "phoneNumber", msg, locale) =>
  check(field, msg).isMobilePhone(locale);
