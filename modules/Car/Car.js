const mongoose = require("mongoose");

const CarSchema = mongoose.Schema(
  {
    mark: {
      type: String,
      min: [1, "min length 1"],
      max: [64, "max length 64"],
      require: [true, "field is required"]
    },
    model: {
      type: String,
      min: [1, "min length 1"],
      max: [64, "max length 64"],
      require: [true, "field is required"]
    },
    typeOfVehicle: {
      type: String,
      enum: [
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
      ],
      require: [true, "field is required"]
    },
    capacity: {
      type: Number,
      min: [0, "min length 0"],
      max: [3000, "max length 3000"],
      require: [true, "field is required"]
    },
    power: {
      type: Number,
      min: [0, "min length 0"],
      max: [3000, "max length 3000"],
      require: [true, "field is required"]
    },
    fuel: {
      type: String,
      min: [1, "min length 1"],
      max: [32, "max length 32"],
      require: [true, "field is required"]
    },
    dateOfFirstRegistration: {
      type: Date,
      min: [new Date(1900, 0, 1), `min date - ${new Date(1900, 0, 1)}`],
      max: [new Date(Date.now()), `max date ${new Date(Date.now())}`],
      require: [true, "field is required"]
    },
    yearOfProduction: {
      type: Number,
      min: [
        new Date(1900, 0, 1).getFullYear(),
        `min year - ${new Date(1900, 0, 1).getFullYear()}`
      ],
      max: [new Date().getFullYear(), `max year - ${new Date().getFullYear()}`],
      require: [true, "field is required"]
    },
    differentiator: {
      type: String,
      min: [1, "min length 1"],
      max: [3, "max length 3"],
      uppercase: true
    },
    origin: {
      type: String,
      enum: ["registeredInTheCountry", "registeredAbroad", "new"],
      require: [true, "field is required"]
    },
    destiny: {
      type: String,
      enum: ["ownUse", "firmCar", "taxi", "drivingCourse", "other"],
      require: [true, "field is required"]
    },
    nextTechnicalInspection: {
      type: Date,
      min: [new Date(1900, 0, 1), `min date - ${new Date(1900, 0, 1)}`],
      max: [
        new Date(Date.now() + 4 * 365 * 24 * 60 * 60 * 1000),
        `max data ${new Date(Date.now() + 4 * 365 * 24 * 60 * 60 * 1000)}`
      ], // about +4y
      require: [true, "field is required"]
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Authentication",
      require: [true, "field is required"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", CarSchema);
