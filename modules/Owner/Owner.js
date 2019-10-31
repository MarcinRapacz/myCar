const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema(
  {
    sex: {
      type: String,
      enum: ["man", "woman"],
      require: [true, "Field is required"]
    },
    dateOfBirth: {
      type: Date,
      min: [new Date(1900, 0, 1), `min date - ${new Date(1900, 0, 1)}`],
      max: [new Date(Date.now()), `max date - ${new Date(Date.now())}`]
    },
    drivingLicensePickupDate: {
      type: Date,
      min: [new Date(1900, 0, 1), `min date - ${new Date(1900, 0, 1)}`],
      max: [new Date(Date.now()), `max date - ${new Date(Date.now())}`]
    },
    postCode: {
      type: String,
      min: 6,
      max: 6
    },
    maritalStatus: {
      type: String,
      enum: ["single", "divorced", "widower", "married"]
    },
    numberOfChildrenUnder18Years: {
      type: Number,
      min: [0, "min valiue is 0"]
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      require: [true, "fiel is required"]
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Authentication",
      require: [true, "fiel is required"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Owner", ownerSchema);
