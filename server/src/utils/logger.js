import pino from 'pino';

const logger = pino();

// set level default is info
if (process.env.NODE_ENV === 'development') {
  logger.level = 'debug';
}

const default_logger = logger.child({ operationName: 'main' });

module.exports = logger;
module.exports.getLogger = (operationName = null) => {
  if (operationName === null) return default_logger;
  return logger.child({ operationName });
};
module.exports.setLevel = (level) => {
  logger.level = level;
};
