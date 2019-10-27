const validator = require("../../validator");

const config = {
  name: {
    field: "name",
    msg: "The name must have a minimum of 2 characters",
    min: 2
  },
  password: {
    field: "password",
    msg: "The password must have a minimum of 8 characters",
    min: 8
  },
  password2: {
    field: "password2",
    field2: "password",
    msg: "Passwords must be the same"
  },
  phoneNumber: {
    locale: "pl-PL"
  },
  resetPasswordToken: {
    field: "resetPasswordToken",
    msg: "Reset Password Token out of range",
    min: 32,
    max: 32
  }
};

module.exports.create = [
  validator.string(config.name.field, config.name.msg, config.name.min),
  validator.email(),
  validator.string(
    config.password.field,
    config.password.msg,
    config.password.min
  ),
  validator.isSame(
    config.password2.field,
    config.password2.field2,
    config.password2.msg
  )
];

module.exports.login = [
  validator.email(),
  validator.string(
    config.password.field,
    config.password.msg,
    config.password.min
  )
];

module.exports.update = [
  validator
    .string(config.name.field, config.name.msg, config.name.min)
    .optional({ checkFalsy: true }),
  validator
    .phoneNumber(undefined, undefined, config.phoneNumber.locale)
    .optional({ checkFalsy: true })
];

module.exports.resetPassword = [
  validator.string(
    config.password.field,
    config.password.msg,
    config.password.min
  ),
  validator.isSame(
    config.password2.field,
    config.password2.field2,
    config.password2.msg
  ),
  validator.string(
    config.resetPasswordToken.field,
    config.resetPasswordToken.msg,
    config.resetPasswordToken.min,
    config.resetPasswordToken.max
  )
];
