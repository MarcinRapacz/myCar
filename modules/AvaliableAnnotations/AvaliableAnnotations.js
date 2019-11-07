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

// Remove all user resorces
avaliableAnnotationsSchema.pre("remove", async function(next) {
  await Promise.all([
    this.model("Annotation").deleteMany({ details: this._id })
  ]);

  next();
});

module.exports = mongoose.model(
  "AvaliableAnnotations",
  avaliableAnnotationsSchema
);
