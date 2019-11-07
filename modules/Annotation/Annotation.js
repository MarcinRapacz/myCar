const mongoose = require("mongoose");

const AnnotationSchema = mongoose.Schema(
  {
    description: {
      type: String,
      min: 1,
      max: 400
    },
    details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AvaliableAnnotations",
      reguire: true
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      reguire: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Authentication",
      reguire: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Annotation", AnnotationSchema);
