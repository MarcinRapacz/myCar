module.exports = ({
  msg = "Something went wrong",
  data = {},
  statusCode = 500
}) => {
  throw { msg, data, statusCode };
};
