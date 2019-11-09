const validator = require("../../validator");

const config = {
  id: {
    msg: "Incorrect MongoId"
  },
  carId: {
    field: "carId",
    msg: "Incorrect MongoId"
  },
  sex: {
    field: "sex",
    msg: "Value does not match pattern",
    pattern: ["man", "woman"]
  },
  dateOfBirth: {
    field: "dateOfBirth",
    msg: "Value out of range",
    min: new Date(1900, 0, 1).toLocaleString(),
    max: new Date(Date.now()).toLocaleString()
  },
  drivingLicensePickupDate: {
    field: "drivingLicensePickupDate",
    msg: "Value out of range",
    min: new Date(1900, 0, 1).toLocaleString(),
    max: new Date(Date.now()).toLocaleString()
  },
  maritalStatus: {
    field: "maritalStatus",
    msg: "Value does not match pattern",
    pattern: ["single", "divorced", "widower", "married"]
  },
  numberOfChildrenUnder18Years: {
    field: "numberOfChildrenUnder18Years",
    msg: "Value out of range",
    min: 0,
    max: 63
  }
};

module.exports.getAll = [
  validator.mongoId(config.carId.field, config.carId.msg)
];
module.exports.get = [validator.mongoId(undefined, config.id.msg)];
module.exports.create = [
  validator.mongoId(config.carId.field, config.carId.msg),
  validator.pattern(config.sex.field, config.sex.msg, config.sex.pattern),
  validator.date(
    config.dateOfBirth.field,
    config.dateOfBirth.msg,
    config.dateOfBirth.min,
    config.dateOfBirth.max
  ),
  validator.date(
    config.drivingLicensePickupDate.field,
    config.drivingLicensePickupDate.msg,
    config.drivingLicensePickupDate.min,
    config.drivingLicensePickupDate.max
  ),
  validator.postCode(),
  validator.pattern(
    config.maritalStatus.field,
    config.maritalStatus.msg,
    config.maritalStatus.pattern
  ),
  validator.integer(
    config.numberOfChildrenUnder18Years.field,
    config.numberOfChildrenUnder18Years.msg,
    config.numberOfChildrenUnder18Years.min
  )
];
module.exports.update = [
  validator.mongoId(undefined, config.id.msg),
  validator
    .pattern(config.sex.field, config.sex.msg, config.sex.pattern)
    .optional(),
  validator
    .date(
      config.dateOfBirth.field,
      config.dateOfBirth.msg,
      config.dateOfBirth.min,
      config.dateOfBirth.max
    )
    .optional(),
  validator
    .date(
      config.drivingLicensePickupDate.field,
      config.drivingLicensePickupDate.msg,
      config.drivingLicensePickupDate.min,
      config.drivingLicensePickupDate.max
    )
    .optional(),
  validator.postCode().optional(),
  validator
    .pattern(
      config.maritalStatus.field,
      config.maritalStatus.msg,
      config.maritalStatus.pattern
    )
    .optional(),
  validator
    .integer(
      config.numberOfChildrenUnder18Years.field,
      config.numberOfChildrenUnder18Years.msg,
      config.numberOfChildrenUnder18Years.min
    )
    .optional()
];
module.exports.delete = [validator.mongoId(undefined, config.id.msg)];
