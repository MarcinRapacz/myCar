module.exports = (req, res, next) => {
  if (req.user && req.user.ranks.includes("admin")) {
    return next();
  }

  return next({ msg: "No authorization", statusCode: 401 });
};
