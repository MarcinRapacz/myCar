const mongoose = require("mongoose");

const avaliableAnnotationsSchema = mongoose.Schema({
  name: {
    type: String,
    min: 0,
    max: 64,
    require: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  slugify: {
    type: String,
    unique: true,
    require: true
  }
});

module.exports = mongoose.model(
  "AvaliableAnnotations",
  avaliableAnnotationsSchema
);
