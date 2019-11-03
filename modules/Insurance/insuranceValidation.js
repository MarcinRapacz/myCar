const validator = require("../../validator");

const config = {
  id: {
    msg: "Incorrect MongoId"
  },
  carId: {
    field: "carId",
    msg: "Incorrect MongoId"
  },
  installment: {
    field: "installment",
    msg: "Incorrect boolean value"
  },
  to: {
    field: "to",
    msg: "Value out of range",
    min: new Date(Date.now() - 1 * 365 * 24 * 60 * 60 * 1000).toLocaleString(),
    max: new Date(Date.now() + 1 * 365 * 24 * 60 * 60 * 1000).toLocaleString()
  },
  company: {
    field: "company",
    msg: "Value out of range",
    min: 1,
    max: 128
  },
  discount: {
    field: "discount",
    msg: "Value out of range",
    min: 0,
    max: 100
  }
};

module.exports.list = [validator.mongoId(config.carId.field, config.carId.msg)];
module.exports.get = [validator.mongoId(undefined, config.id.msg)];
module.exports.create = [
  validator.mongoId(config.carId.field, config.carId.msg),
  validator.boolean(config.installment.field, config.installment.msg),
  validator.date(config.to.field, config.to.msg, config.to.min, config.to.max),
  validator.string(
    config.company.field,
    config.company.msg,
    config.company.min,
    config.company.max
  ),
  validator.integer(
    config.discount.field,
    config.discount.msg,
    config.discount.min,
    config.discount.max
  )
];
module.exports.update = [
  validator.mongoId(undefined, config.id.msg),
  validator
    .boolean(config.installment.field, config.installment.msg)
    .optional(),
  validator
    .date(config.to.field, config.to.msg, config.to.min, config.to.max)
    .optional(),
  validator
    .string(
      config.company.field,
      config.company.msg,
      config.company.min,
      config.company.max
    )
    .optional(),
  validator
    .integer(
      config.discount.field,
      config.discount.msg,
      config.discount.min,
      config.discount.max
    )
    .optional()
];
module.exports.delete = [validator.mongoId(undefined, config.id.msg)];
