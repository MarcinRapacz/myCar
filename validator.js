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
 * Check if field is correct number
 * @param field field name
 * @param msg error message
 * @param min minimum value (default: 0)
 * @param max maximum value
 */
module.exports.integer = (field, msg, min = 0, max = 1000) =>
  check(field, msg).isInt({ min, max });

/**
 * Check if field is correct boolean value
 * @param field field name
 * @param msg error message
 */
module.exports.boolean = (field, msg) => check(field, msg).isBoolean();

/**
 * Check if field is correct date
 * @param field field name
 * @param msg error message
 * @param min minimum date
 * @param max maximum date
 */
module.exports.date = (field, msg, min, max) =>
  check(field, msg)
    .isAfter(min)
    .isBefore(max);

/**
 * Compare with pattern
 * @param field field name
 * @param msg error message
 * @param pattern pattern
 */
module.exports.pattern = (field, msg, pattern) =>
  check(field, msg).custom(value => pattern.includes(value));

/**
 * Check if field is correct address email
 * @param field email address (default: email)
 */
module.exports.email = (field = "email") =>
  check(field)
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false });

/**
 * Check if field is correct post code
 * @param field post code (default: postCode)
 * @param locale locale (default: PL)
 */
module.exports.postCode = (field = "postCode", locale = "PL") =>
  check(field).isPostalCode(locale);

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

/**
 * Check if field is correct MongoId
 * @param field mongoId
 * @param msg error message
 */
module.exports.mongoId = (field = "id", msg) => check(field, msg).isMongoId();
