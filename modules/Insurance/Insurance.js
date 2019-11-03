const mongoose = require("mongoose");

const insuranceSchema = mongoose.Schema(
  {
    to: {
      type: Date,
      min: new Date(Date.now() - 1 * 365 * 24 * 60 * 60 * 1000),
      max: new Date(Date.now() + 1 * 365 * 24 * 60 * 60 * 1000)
    },
    company: {
      type: String,
      min: 1,
      max: 128
    },
    discount: {
      type: Number,
      min: 0,
      max: 100
    },
    installment: {
      type: Boolean,
      default: false
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      require: true,
      unique: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Authentication",
      require: [true, "fiel is required"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Insurance", insuranceSchema);
