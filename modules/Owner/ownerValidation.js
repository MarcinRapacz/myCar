const validator = require("../../validator");

const config = {
  carId: {
    field: "carId"
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
    min: 0
  }
};

module.exports.getAll = [validator.mongoId(config.carId.field)];
module.exports.get = [validator.mongoId()];
module.exports.create = [
  validator.mongoId(config.carId.field),
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
  validator.mongoId(),
  validator.mongoId(config.carId.field),
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
module.exports.delete = [validator.mongoId()];
