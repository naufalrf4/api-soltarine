const logger = require("../utils/logger");

const errorMiddleware = (err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("Something broke!");
};

module.exports = errorMiddleware;
