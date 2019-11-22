const validator = require("../../validator");

const config = {
  id: {
    msg: "Incorrect MongoId"
  },
  mark: {
    field: "mark",
    msg: "Value out of range",
    min: 1,
    max: 64
  },
  commercialModel: {
    field: "commercialModel",
    msg: "Value out of range",
    min: 1,
    max: 64
  },
  typeOfVehicle: {
    field: "typeOfVehicle",
    msg: "Value does not match pattern",
    pattern: [
      "car",
      "truck",
      "specialCar",
      "moped",
      "motorcycle",
      "quad",
      "bus",
      "trolleybus",
      "agriculturalTractor",
      "carTractor",
      "lightTrailer",
      "semiTrailer",
      "specialSemiTrailer",
      "truckTrailer",
      "agriculturalTruck",
      "specialTrailer",
      "different"
    ]
  },
  capacity: {
    field: "capacity",
    msg: "Value out of range",
    min: 0,
    max: 100000
  },
  power: {
    field: "power",
    msg: "Value out of range",
    min: 0,
    max: 10000
  },
  fuel: {
    field: "fuel",
    msg: "Value out of range",
    min: 1,
    max: 32
  },
  dateOfFirstRegistration: {
    field: "dateOfFirstRegistration",
    msg: "Value out of range",
    min: new Date(1900, 0, 1).toLocaleString(),
    max: new Date().toLocaleString()
  },
  yearOfProduction: {
    field: "yearOfProduction",
    msg: "Value out of range",
    min: new Date(1900, 0, 1).getFullYear(),
    max: new Date().getFullYear()
  },
  differentiator: {
    field: "differentiator",
    msg: "Value out of range",
    min: 1,
    max: 3
  },
  origin: {
    field: "origin",
    msg: "Value does not match pattern",
    pattern: ["registeredInTheCountry", "registeredAbroad", "new"]
  },
  destiny: {
    field: "destiny",
    msg: "Value does not match pattern",
    pattern: ["ownUse", "firmCar", "taxi", "drivingCourse", "other"]
  },
  nextTechnicalInspection: {
    field: "nextTechnicalInspection",
    msg: "Value out of range",
    min: new Date(1900, 0, 1).toLocaleString(),
    max: new Date(Date.now() + 4 * 365 * 24 * 60 * 60 * 1000).toLocaleString()
  }
};

module.exports.create = [
  validator.string(
    config.mark.field,
    config.mark.msg,
    config.mark.min,
    config.mark.max
  ),
  validator.string(
    config.commercialModel.field,
    config.commercialModel.msg,
    config.commercialModel.min,
    config.commercialModel.max
  ),
  validator.pattern(
    config.typeOfVehicle.field,
    config.typeOfVehicle.msg,
    config.typeOfVehicle.pattern
  ),
  validator.integer(
    config.capacity.field,
    config.capacity.msg,
    config.capacity.min,
    config.capacity.max
  ),
  validator.integer(
    config.power.field,
    config.power.msg,
    config.power.min,
    config.power.max
  ),
  validator.string(
    config.fuel.field,
    config.fuel.msg,
    config.fuel.min,
    config.fuel.max
  ),
  validator.date(
    config.dateOfFirstRegistration.field,
    config.dateOfFirstRegistration.msg,
    config.dateOfFirstRegistration.min,
    config.dateOfFirstRegistration.max
  ),
  validator.integer(
    config.yearOfProduction.field,
    config.yearOfProduction.msg,
    config.yearOfProduction.min,
    config.yearOfProduction.max
  ),
  validator.string(
    config.differentiator.field,
    config.differentiator.msg,
    config.differentiator.min,
    config.differentiator.max
  ),
  validator.pattern(
    config.origin.field,
    config.origin.msg,
    config.origin.pattern
  ),
  validator.pattern(
    config.destiny.field,
    config.destiny.msg,
    config.destiny.pattern
  ),
  validator.date(
    config.nextTechnicalInspection.field,
    config.nextTechnicalInspection.msg,
    config.nextTechnicalInspection.min,
    config.nextTechnicalInspection.max
  )
];

module.exports.get = [validator.mongoId(undefined, config.id.msg)];

module.exports.update = [
  validator.mongoId(undefined, config.id.msg),
  validator
    .string(
      config.mark.field,
      config.mark.msg,
      config.mark.min,
      config.mark.max
    )
    .optional(),
  validator
    .string(
      config.commercialModel.field,
      config.commercialModel.msg,
      config.commercialModel.min,
      config.commercialModel.max
    )
    .optional(),
  validator
    .pattern(
      config.typeOfVehicle.field,
      config.typeOfVehicle.msg,
      config.typeOfVehicle.pattern
    )
    .optional(),
  validator
    .integer(
      config.capacity.field,
      config.capacity.msg,
      config.capacity.min,
      config.capacity.max
    )
    .optional(),
  validator
    .integer(
      config.power.field,
      config.power.msg,
      config.power.min,
      config.power.max
    )
    .optional(),
  validator
    .string(
      config.fuel.field,
      config.fuel.msg,
      config.fuel.min,
      config.fuel.max
    )
    .optional(),
  validator
    .date(
      config.dateOfFirstRegistration.field,
      config.dateOfFirstRegistration.msg,
      config.dateOfFirstRegistration.min,
      config.dateOfFirstRegistration.max
    )
    .optional(),
  validator
    .integer(
      config.yearOfProduction.field,
      config.yearOfProduction.msg,
      config.yearOfProduction.min,
      config.yearOfProduction.max
    )
    .optional(),
  validator
    .string(
      config.differentiator.field,
      config.differentiator.msg,
      config.differentiator.min,
      config.differentiator.max
    )
    .optional(),
  validator
    .pattern(config.origin.field, config.origin.msg, config.origin.pattern)
    .optional(),
  validator
    .pattern(config.destiny.field, config.destiny.msg, config.destiny.pattern)
    .optional(),
  validator
    .date(
      config.nextTechnicalInspection.field,
      config.nextTechnicalInspection.msg,
      config.nextTechnicalInspection.min,
      config.nextTechnicalInspection.max
    )
    .optional()
];

module.exports.delete = [validator.mongoId(undefined, config.id.msg)];
