const validator = require("../../validator");

const config = {
  id: {
    msg: "Incorrect MongoId"
  },
  carId: {
    field: "carId",
    msg: "Incorrect MongoId"
  },
  name: {
    field: "name",
    msg: "Value out of range",
    min: 2,
    max: 64
  },
  description: {
    field: "description",
    msg: "Value out of range",
    min: 2,
    max: 400
  },
  dateOfNotification: {
    field: "dateOfNotification",
    msg: "Value out of range",
    min: new Date(1900, 0, 1).toLocaleString(),
    max: new Date().toLocaleString()
  }
};

module.exports.list = [validator.mongoId(config.carId.field, config.carId.msg)];
module.exports.create = [
  validator.mongoId(config.carId.field, config.carId.msg),
  validator.string(
    config.name.field,
    config.name.msg,
    config.name.min,
    config.name.max
  ),
  validator.string(
    config.description.field,
    config.description.msg,
    config.description.min,
    config.description.max
  ),
  validator.date(
    config.dateOfNotification.field,
    config.dateOfNotification.msg,
    config.dateOfNotification.min,
    config.dateOfNotification.max
  )
];
module.exports.get = [validator.mongoId(undefined, config.id.msg)];
module.exports.update = [
  validator.mongoId(undefined, config.id.msg),
  validator
    .string(
      config.name.field,
      config.name.msg,
      config.name.min,
      config.name.max
    )
    .optional(),
  validator
    .string(
      config.description.field,
      config.description.msg,
      config.description.min,
      config.description.max
    )
    .optional(),
  validator
    .date(
      config.dateOfNotification.field,
      config.dateOfNotification.msg,
      config.dateOfNotification.min,
      config.dateOfNotification.max
    )
    .optional()
];
module.exports.delete = [validator.mongoId(undefined, config.id.msg)];
