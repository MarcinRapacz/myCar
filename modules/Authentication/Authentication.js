const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authenticationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, "min length 2"],
      required: [true, "please add a value"]
    },
    email: {
      type: String,
      required: [true, "please add a value"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email"
      ]
    },
    password: {
      type: String,
      required: [true, "please add a value"],
      minlength: [8, "min length 8"],
      select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  { timestamps: true }
);

/**
 * Generate and return Json Web Token
 * @return Json Web Token
 */
authenticationSchema.methods.getToken = function() {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });

  return token;
};

/**
 * Login User
 * @param email email address
 * @param password user password
 * @return user data if params are correct or null
 */
authenticationSchema.static("login", async function({ email, password }) {
  const user = await this.findOne({ email }).select("+password");
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    }
  }
  return null;
});

// Hash password and store in data base
authenticationSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Handle Data Base Error
authenticationSchema.post("save", function(error, doc, next) {
  if (error.name) {
    next({ msg: error.message, statusCode: 401 });
  } else {
    next();
  }
});

module.exports = mongoose.model("Authentication", authenticationSchema);
