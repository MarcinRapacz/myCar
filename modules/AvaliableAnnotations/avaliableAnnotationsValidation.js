const validator = require("../../validator");

const config = {
  name: {
    field: "name",
    msg: "Invalid name",
    min: 0,
    max: 64
  },
  slugifyText: {
    field: "slugifyText",
    msg: "Invalid slugify text"
  }
};

module.exports.list = [];
module.exports.create = [
  validator
    .string(
      config.name.field,
      config.name.msg,
      config.name.min,
      config.name.max
    )
    .customSanitizer(v => v.toLowerCase())
];
module.exports.update = [
  validator
    .string(
      config.name.field,
      config.name.msg,
      config.name.min,
      config.name.max
    )
    .customSanitizer(v => v.toLowerCase()),
  validator
    .string(config.slugifyText.field, config.slugifyText.msg)
    .customSanitizer(v => v.toLowerCase())
];
module.exports.delete = [
  validator
    .string(config.slugifyText.field, config.slugifyText.msg)
    .customSanitizer(v => v.toLowerCase())
];
