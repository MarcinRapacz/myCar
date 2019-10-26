const jwt = require("jsonwebtoken");
const Authentication = require("../modules/Authentication/Authentication");

module.exports = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return next({ msg: err.message, statusCode: 401 });
      }
      const user = await Authentication.findById(decoded.id);
      if (!user) {
        return next({ msg: "User not found", statusCode: 404 });
      }

      req.user = user;
      next();
    });
  } else {
    next({ msg: "Token not found", statusCode: 401 });
  }
};
