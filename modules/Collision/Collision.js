const mongoose = require("mongoose");

const collisionSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "field is required"],
    min: [2, "min value - 2"],
    max: [64, "min value - 64"]
  },
  description: {
    type: String,
    min: [2, "min value - 2"],
    max: [400, "min value - 400"]
  },
  dateOfNotification: {
    type: Date,
    min: [new Date(1900, 0, 1), `min date - ${new Date(1900, 0, 1)}`],
    max: [new Date(Date.now()), `max date ${new Date(Date.now())}`],
    require: [true, "field is required"]
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    require: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Authentication",
    require: true
  }
});

module.exports = mongoose.model("Collision", collisionSchema);
